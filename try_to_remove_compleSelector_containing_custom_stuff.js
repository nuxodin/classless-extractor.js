
export function extract(){
    let str = '';
    for (const sheet of document.styleSheets) {
        const css = checkSheet(sheet);
        if (css) str += css;
    }
//    console.log(str)

    let win = open('./template.html');
    win.addEventListener('DOMContentLoaded', () => {
        win.document.body.insertAdjacentHTML('beforeend',`<style style="display:block; white-space:pre; font-family:monospace; line-height:1.1; font-size:12px" contenteditable>${str}</style>`);
    });

    //    return str;
}


function checkSheet(sheet){
    try { return checkRules(sheet.cssRules); }
    catch (e) { return;}
}
function checkRules(rules) {
    let str = '';
    for (const rule of rules) {
        const css = checkRule(rule);
        if (css) str += css;
    }
    return str;
}

function checkStyleRule(rule){
    // todo: i need a real selector parser!
    if (!rule.style.cssText.trim()) return; // todo performance: if this is heavy, we should make this check after selector check
    let selectorList = rule.selectorText;
console.log(selectorList)
    // remove all selectors that have classes
//    selectorList = selectorList.replaceAll(/[^^$\(,]#[^$\),]+/g, '');
    selectorList = selectorList.replaceAll(/[^^$\(,]\.[^$\),]+/g, '');

    selectorList = selectorList.replaceAll(/[^^$\(,]\[data-x\][^$\),]+/g, '');

    selectorList = selectorList.replaceAll(/,,/g, ',');
    // remove all data-attributes
console.log(selectorList)


    /*
    const selectors = selectorList.split(',');
    const filteredSelectors = selectors.filter(selector => {
        console.log(selector)
        if (selector.match(/\./)) return;
        if (selector.match(/\#/)) return;
        //if (selector.match(/\[data-/)) return;
        return true;
    });
    if (filteredSelectors.length === 0) return;
    const newSelectorList = filteredSelectors.join(',').trim();
    */
    const newSelectorList = selectorList.trim();
    let str = newSelectorList + ' {\n   ';
        str += rule.style.cssText.replaceAll(';',';\n  ');
    str += '}\n';
    console.log(str)
    return str;

}

function checkRule(rule){
    if (rule.type === CSSRule.STYLE_RULE) return checkStyleRule(rule)
    if (rule.type === CSSRule.IMPORT_RULE) {
        let sheet = rule.styleSheet;
        return checkSheet(sheet);
    }
    if (rule.type === CSSRule.MEDIA_RULE) {
        if (matchMedia(rule.conditionText).matches) {
            console.log('media match');
            return checkRules(rule.cssRules);
        }
        return;
    }
    if (rule.type === CSSRule.SUPPORTS_RULE) {
        console.log('supports rule, what should we do?');
        return;
    }
    if (rule.type === CSSRule.KEYFRAMES_RULE) {
        return rule.cssText;
    }
    if (rule.type === CSSRule.KEYFRAME_RULE) {
        console.log('keyframe rule, what should we do?');
        return;
        let sheet = rule.styleSheet;
        checkSheet(sheet);
    }
    if (rule.type === CSSRule.FONT_FACE_RULE) {
        console.log('font face rule, what should we do?');
        return;
        let sheet = rule.styleSheet;
        checkSheet(sheet);
    }
    if (rule.type === CSSRule.PAGE_RULE) {
        console.log('page rule, what should we do?');
        let sheet = rule.styleSheet;
        checkSheet(sheet);
    }
    if (rule.type === CSSRule.DOCUMENT_RULE) {
        console.log('document rule, what should we do?');
        let sheet = rule.styleSheet;
        checkSheet(sheet);
    }
    if (rule.type === CSSRule.CHARSET_RULE) {
        console.log('charset rule, what should we do?');
        let sheet = rule.styleSheet;
        checkSheet(sheet);
    }
    if (rule.type === CSSRule.NAMESPACE_RULE) {
        console.log('namespace rule, what should we do?');
        return;
        let sheet = rule.styleSheet;
        checkSheet(sheet);
    }
    console.log('unknown ('+rule.type+') rule type, what should we do?');
}