import Upload2 from "./upload2";

const components = [ Upload2 ]

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component)
    })
}

if (typeof window !== 'undefined') {
    install(window.Vue)
}

export default {
    install
}