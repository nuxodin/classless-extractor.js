
//const realStats = {};
const realStats = Object.create(null);
const stats = autoviv(realStats);


let Ps = document.querySelectorAll('p');
for (const P of Ps) {
    const style = getComputedStyle(P);
    stats.fontSizes[style.fontSize]++;
    stats.textColors[style.color]++;
}
let Buttons = document.querySelectorAll('button');
for (const Btn of Buttons) {
    const style = getComputedStyle(Btn);
    stats['button']['backgroundColor'][style.backgroundColor]++;
    stats['button']['padding'][style.padding]++;
    stats['button']['border'][style.border]++;
    stats['button']['color'][style.color]++;
}


console.log(winner(realStats.textColors));

let css = `
html {
    font-size: ${winner(realStats.fontSizes)};
    --color-text: ${winner(realStats.textColors)};
}
button {
    backgroundColor: ${winner(stats['button']['backgroundColor'])};
    padding: ${winner(stats['button']['padding'])};
    border: ${winner(stats['button']['border'])};
    color: ${winner(stats['button']['color'])};
}
`
console.log(css);







/*****************************************************************************
 *                                                                           *
 *   helpers                                                                 *
 *                                                                           *
 *****************************************************************************/

function winner(obj){
    const keys = Object.keys(obj);
    if (keys.length === 0) return '';
    return keys.reduce((a, b) => obj[a] > obj[b] ? a : b);
}

/*****************************************************************************
 *                                                                           *
 *   autoviv                                                                 *
 *                                                                           *
 *****************************************************************************/

function autoviv(variable) {
    return new Proxy(variable, {
        get: function (target, name) {

            if (name in target) {
                if (Object.getPrototypeOf(target[name]) === null) return autoviv(target[name]); // how can we reuse the initial Proxy?
                return target[name];
            }

            if (name === Symbol.toPrimitive) return toPrimitive

            // if (name === Symbol.toPrimitive) return function toPrimitive(hint) {
            //     console.log('toPrimitime', hint, name, this, target, receiver);
            //     console.log(this._name)
            //     let value = '';
            //     if (hint === 'number') value = 0;
            //     //target.name = value;
            //     return value;
            // }

            target[name] = Object.create(null); // target[name] = {};
            //target[name] = Object.create(autovivTargetProto);
            // target[name]['_parent'] = target;
            // target[name]['_name'] = name;
            //target[name][Symbol.toPrimitive] = toPrimitive;

            return autoviv(target[name])
        }
    })
}

function toPrimitive(hint) {
    if (hint === 'number') return 0;
    if (hint === 'string') return '';
    return '';
}

// const autovivTargetProto = Object.create(null);
// autovivTargetProto[Symbol.toPrimitive] = toPrimitive;
