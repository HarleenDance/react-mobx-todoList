
import { makeAutoObservable } from 'mobx'
class TaskStore {
    list = [
        {
            id: 1,
            name: '学习react',
            isDone: true
        },
        {
            id: 2,
            name: '搞定mobx',
            isDone: false
        }
    ]
    constructor() {
        makeAutoObservable(this)
    }
    // 计算属性  只有所以子项都是选中的时候  才是选中的状态
    get isAll() {
        return this.list.every(item => item.isDone)
    }
    // 总数操作
    get allList() {
        return this.list.length || 0
    }
    // 选中总数
    get finishList() {
        return this.list.filter(item => item.isDone).length
    }
    // 单选操作
    singleCheck(id, isDone) {
        // 查找  find findIndex
        const item = this.list.find(item => item.id === id)
        item.isDone = isDone
    }
    // 全选操作
    allCheck(checked) {
        this.list.forEach(item => {
            item.isDone = checked
        })
    }
    // 删除操作
    delTask = (id) => {
        this.list = this.list.splice(id, 1)
        // this.list = this.list.filter(item => item.id !== id)
    }
    // 新增操作
    addTack = (task) => {
        this.list.push(task)
    }
}
export default TaskStore
