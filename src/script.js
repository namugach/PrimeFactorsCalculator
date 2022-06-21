Object.defineProperties(Array.prototype, {
	first: {
		get() { return this[0]; },
		set() { this[0] = v; }
	},
	last: {
		get() { return this[this.length - 1]; },
		set(v) { this[this.length - 1] = v; }
	}
});

const sPrimeFactorization = {
	pri: {
		core(num) {
			const result = [];
			for(let i=2; i<=num; i++) {
				if(1 < num && num % i === 0) {
					result.push(i);
					num = num / i;
					i = 1;
				}
			}
			return result;
		},
		arrangement(num) {
			const here = sPrimeFactorization.pri;
			let result = [], primeFactors = here.core(num);
			primeFactors.forEach((elem, i) => {
				if(0 < result.length) {
					if(result.last[0] === elem) {
						result.last.push(elem);
					}
					else {
						result.last = [result.last[0], result.last.length];
						result.push([elem]);
					}
					if(i === primeFactors.length - 1) {
						result.last = [result.last[0], result.last.length];
					}
				}
				else {
					result.push([elem]);
				}
			});
			return result;
		},
		getDivisorCount(primeFactors = []) {
			let result = 1;
			1 < primeFactors.first.length 
			? primeFactors.forEach(elem => result *= elem.last + 1)
			: result = 2;
			return result;
		},
		getDivisorElem(primeFactors) {
			let matrix = [], result = [];
			if(1 < primeFactors.first.length ) {
				primeFactors.forEach((elem, i) => {
					for(let j=0; j<elem.last; j++) {
						j === 0 
						? matrix.push([elem.first])
						: matrix[i].push(matrix[i].last * elem.first);
					}
				});
				
				matrix.forEach(elem => {
					let temp = elem;
					if(0 < result.length) {
						elem.forEach(elemNum => {
							result.forEach(rNum => temp.push(rNum * elemNum));
						});
						result.push(...temp);
					}
					else {
						result.push(...elem);
					}
				});
				result.unshift(1);
				result = result.sort((a, b) => a - b);
			}
			else {
				result.push(1, primeFactors.first.first);
			}
			return result
		},
		getprimeNumbers(primeFactors) {
			let result = [];
			primeFactors.forEach(elem => result.push(elem.first));
			return result;
		}
	}
}
class PrimeFactorization {
	constructor(num) {
		this.set(num);
	}
	set(num) {
		if(1 < num) {
			const pri = sPrimeFactorization.pri,
			value = pri.arrangement(num);
			this.number = num;
			this.value = value;
			this.divisorCount = pri.getDivisorCount(value);
			this.divisorElem = pri.getDivisorElem(value);
			this.primeNumbers = pri.getprimeNumbers(value);
		}
		else {
			this.number = 1;
			this.value = [1];
			this.divisorCount = 1;
			this.divisorElem = 0;
			this.primeNumbers = 0;
		}
	}
}

const sPrimeFactorsBox = {
	pri: {
		createElement: {
			input(value, valueClassName = "value") {
				const wrap = document.createElement("div"),
				name = document.createElement("div"),
				input = document.createElement("input"),
				button = document.createElement("button");
				input.className = valueClassName;

				wrap.style.margin = "5px";
				wrap.style.padding = "5px";
				wrap.style.backgroundColor = "#e3e3e3"
				wrap.style.display = "flex"

				name.innerText = "값: ";
				input.style.margin = "0 10px 0 10px"
				input.style.width = "80px";
				input.style.textAlign = "right";

				input.value = value;
				button.innerText = "ok";
				wrap.appendChild(name);
				wrap.appendChild(input);
				wrap.appendChild(button);
				return wrap;
			},
			content(name, value, valueClassName = "value") {
				const wrap = document.createElement("div"),
				_name = document.createElement("div"),
				_value = document.createElement("div");
				_value.className = valueClassName;
				wrap.style.margin = "5px";
				wrap.style.padding = "5px";
				wrap.style.backgroundColor = "#e3e3e3"
				wrap.style.display = "flex"
				wrap.style.wordBreak = "break-all"
				_name.style.width = "170px"
				_value.style.width = "100%";

				_name.innerText = name;
				_value.innerText = value;
				wrap.appendChild(_name);
				wrap.appendChild(_value);
				return wrap;
			},
			main(props = {}) {
				const here = sPrimeFactorsBox.pri.createElement, 
				wrap = document.createElement("div"),
				{number, value, divisorCount,  primeNumbers,  divisorElem} = props;
				wrap.style.padding = "2px";
				wrap.style.border = "solid 1px #aaa";
				wrap.style.margin = "10px";
				const 
					_number = here.input(number, "number"),
					_primeFactor = here.content("소인수분해: ", value, "primeFactor"),
					_divisorCount = here.content("약수갯수: ", divisorCount, "divisorCount"),
					_primeNumbers = here.content("소수: ", primeNumbers, "primeNumbers"),
					_divisorElem = here.content("약수원소: ", divisorElem, "divisorElem");

				wrap.appendChild(_number);
				wrap.appendChild(_primeFactor);
				wrap.appendChild(_divisorCount);
				wrap.appendChild(_primeNumbers);
				wrap.appendChild(_divisorElem);
				
				return wrap;
			}
		},
		decoPrimeFactor(value) {
			let _value = JSON.parse(JSON.stringify(value));
			_value.forEach((elem, i) => _value[i] = `[${elem}]`);
			return _value.toString().replaceAll(",", ", ");;
		},
		defineProps() {
			let
				_number = this.elem.getElementsByClassName("number")[0],
				_primeFactor = { value: 0, elem: this.elem.getElementsByClassName("primeFactor")[0] },
				_divisorCount = { value: 0, elem: this.elem.getElementsByClassName("divisorCount")[0] },
				_primeNumbers = { value: 0, elem: this.elem.getElementsByClassName("primeNumbers")[0] },
				_divisorElem = { value: 0, elem: this.elem.getElementsByClassName("divisorElem")[0] };

			Object.defineProperties(this, {
				number: {
					get() { return _number.value; },
					set(v) {
						_number.value = v;
					},
					enumerable: true
				},
				primeFactor: {
					get() { return _primeFactor.value; },
					set(v) {
						_primeFactor.value = v;
						_primeFactor.elem.childNodes[0].data = v;
					},
					enumerable: true
				},
				divisorCount: {
					get() { return _divisorCount.value; },
					set(v) {
						_divisorCount.value = v;
						_divisorCount.elem.childNodes[0].data = v;
					},
					enumerable: true
				},
				primeNumbers: {
					get() { return _primeNumbers.value; },
					set(v) {
						_primeNumbers.value = v;
						_primeNumbers.elem.childNodes[0].data = v;
					},
					enumerable: true
				},
				divisorElem: {
					get() { return _divisorElem.value; },
					set(v) {
						_divisorElem.value = v;
						_divisorElem.elem.childNodes[0].data = v;
					},
					enumerable: true
				},
			});
		},
		setProps() {
			const here = sPrimeFactorsBox.pri;
			this.number = this.primeFactorObj.number;
			this.primeFactor = here.decoPrimeFactor.call(this, this.primeFactorObj.value);
			this.divisorCount = this.primeFactorObj.divisorCount;
			this.primeNumbers = this.primeFactorObj.primeNumbers.toString().replaceAll(",", ", ");
			this.divisorElem = this.primeFactorObj.divisorElem.toString().replaceAll(",", ", ");
		},
		setEvents() {
			const
				here = sPrimeFactorsBox.pri,
				button = this.elem.getElementsByTagName("button")[0],
				input = this.elem.getElementsByTagName("input")[0],
				handler = () => {
					if (this.primeFactorObj.number !== this.number) {
						this.primeFactorObj.set(Number(this.number));
						here.setProps.call(this);
					}
				}
			button.addEventListener("click", handler);
			input.addEventListener("keydown", e => {
				if(e.key === "Enter") handler();
			})
		},
		init() {
			const here = sPrimeFactorsBox.pri;
			here.defineProps.call(this);
			here.setProps.call(this);
			here.setEvents.call(this);
		}
	}
}
class PrimeFactorsCalculator {
	constructor(number = 7) {
		this.primeFactorObj = new PrimeFactorization(number);
		this.elem = sPrimeFactorsBox.pri.createElement.main();
		sPrimeFactorsBox.pri.init.call(this);
	}
	render(target) {
		target.appendChild(this.elem);
	}
}

function setPrimeFactorCalculator(target,count = 13) {
	const pFactorBoxs = [];
	for(let i=1; i<=count; i++) {
		pFactorBoxs.push(new PrimeFactorsCalculator(i));
		pFactorBoxs.last.render(target);
	}
	return pFactorBoxs;
}

function getSortDivisorCount(pFactorBoxs = []) {
	let result = [];
	pFactorBoxs.forEach(
		(elem, i) => result.push([i+1, elem.primeFactorObj.divisorCount])
	);
	result = result.sort((a, b) => b[1] - a[1]);
	return result;
}
function createSortDivisorCount(count) {
	const wrap = document.createElement("div");
	wrap.style.display = "grid";
	wrap.style.gridTemplateColumns = "1fr 1fr 1fr 1fr";
	getSortDivisorCount(setPrimeFactorCalculator(wrap, count));
	return wrap;
}

app.appendChild(createSortDivisorCount(16));