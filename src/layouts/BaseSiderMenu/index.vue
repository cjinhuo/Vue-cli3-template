<script type="text/jsx">
export default {
    name: 'BaseSiderMenu',
    data() {
        return {
            path: this.$route.path,
            menuData: [],
            isHide: false
        }
    },
    computed: {
        isSinglePage() {
            const arr = this.$route.path.split('/')
            return `${arr[1]}${arr[2]}`
        }
    },
    watch: {
        $route(to) {
            this.findPath(to.path)
        },
        // 页面切换到别的模块后需要重新初始化menuData
        isSinglePage() {
            this.init()
        },
        menuData() {
            this.findPath(this.$route.path)
        }
    },
    created() {
        // this.init()
    },
    methods: {
        // 向上寻找，直到找到在mapRoute对应的name时返回这个对象
        upFindRouterObject() {
            const matched = this.$route.matched
            const length = matched.length
            for (let i = length - 1; i > 0; i--) {
                if (newMapRouter[matched[i].name]) {
                    return newMapRouter[matched[i].name]
                }
            }
            return []
        },
        init() {
            const currentPath = this.$route.path
            const originMenuData = this.upFindRouterObject()
            // if (originMenuData.length === 0 || originMenuData.hideInMenu) {
            //     this.isHide = true;
            //     return;
            // }
            // if (!Array.isArray(originMenuData.children) || originMenuData.children.length === 0) {
            //     this.isHide = true;
            //     return;
            // }
            this.menuData = JSON.parse(JSON.stringify(originMenuData.children))
            this.filterMenuData(this.menuData)
            this.findPath(currentPath)
            // 过滤menuData（去除hideInMenu等等）
        },
        // 根据当前地址找到触发的侧边栏地址并且赋值
        findPath(currentPath) {
            const currentPathArray = currentPath.split('/')
            const allPath = this.recursionBackPaths(this.menuData)
            while (!allPath[currentPathArray.join('/')] && currentPathArray.length > 1) {
                currentPathArray.pop()
            }
            this.path = currentPathArray.join('/')
        },
        filterMenuData(menuData) {
            // 删除所有含有isHide为true的对象数组
            if (!Array.isArray(menuData)) return {}
            menuData.forEach((value, index) => {
                if (value.meta && value.meta.hideInMenu) {
                    menuData.splice(index, 1)
                    return this.filterMenuData(menuData)
                }
                if (value.children) {
                    return this.filterMenuData(value.children)
                }
            })
        },
        // 返回侧边栏的所有的path
        recursionBackPaths(menuData) {
            const pathArray = {}
            if (!Array.isArray(menuData)) return {}
            menuData.forEach(v => {
                if (v.children) {
                    if (v.path) {
                        pathArray[v.path] = true
                    }
                    Object.assign(pathArray, this.recursionBackPaths(v.children))
                } else if (v.path) {
                    pathArray[v.path] = true
                }
            })
            return pathArray
        },
        renderMenu(menuData) {
            let dom = []
            menuData.forEach(item => {
                // 子集并且有icon就说明是主菜单
                if (item.children && item.children.length !== 0 && item.meta && item.meta.icon) {
                    dom.push(
                        <sa-submenu key={item.path} index={item.path} >
                            <template slot="title">
                            <i class="datasimba-icon" class={item.meta.icon} style="margin-right: 8px"/>
                            <span>{item.meta.title}</span>
                            <i class="sa-submenu__icon-arrow sa-icon-caret-bottom" />
                        </template>
                        {this.renderMenu(item.children)}
                        </sa-submenu>,
                    )
                } else {
                    dom.push(
                    <sa-menu-item key={item.path} index={item.path} >
                        <i class="datasimba-icon" class={item.meta.icon || ''} style="margin-right: 8px"/>
                        <span slot="title">{ item.meta.title }</span>
                    </sa-menu-item>,
                    )
                }
            })
            return dom
        }
    },
    render() {
        // if (this.isHide) return null
        return (
            // <sa-menu default-active={this.path} router>
                // {this.renderMenu(this.menuData)}
            // </sa-menu>
            <div>123</div>
        )
    }
}

</script>
