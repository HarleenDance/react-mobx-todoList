// 功能
// 1. 渲染列表数据

// 2. 单选功能

// 3. 全选功能

// 4. 删除功能

// 5. 回车新增功能

// 6. 统计计数功能


import './index.css'
import { useStore } from '../store/index'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'
import { useState } from 'react'
function Task() {
    // useStore
    const { taskStore } = useStore()
    // 打勾
    function onChange(id, isDone) {
        console.log(id, isDone)
        taskStore.singleCheck(id, isDone)
    }
    // 全选
    function onAllChange(checked) {
        taskStore.allCheck(checked)
    }
    // 删除
    function delTask(id) {
        taskStore.delTask(id)
    }
    // 新增
    const [taskValue, settaskValue] = useState('')
    function addTack(e) {
        if (e.keyCode === 13) {
            taskStore.addTack({
                id: uuid(),
                name: taskValue,
                isDone: false,
            })
            settaskValue('')
        }
    }
    return (
        <section className="todoapp">
            <header className="header">
                <h1>todos</h1>
                {/* 新增输入框 */}
                <input
                    value={taskValue}
                    onChange={(e) => settaskValue(e.target.value)}
                    onKeyUp={addTack}
                    className="new-todo"
                    autoFocus
                    autoComplete="off"
                    placeholder="What needs to be done?"
                />
            </header>
            <section className="main">
                {/* 全选 */}
                <input
                    id="toggle-all"
                    className="toggle-all"
                    type="checkbox"
                    checked={taskStore.isAll}
                    onClick={(e) => onAllChange(e.target.checked)}
                />
                <label htmlFor="toggle-all"></label>
                <ul className="todo-list">
                    {/* 列表 */}
                    {/* completed 类名标识 */}
                    {taskStore.list.map(item => (
                        <li
                            className={item.isDone ? 'todo completed' : 'todo'}
                            key={item.id}
                        >
                            <div className="view">
                                {/* 单选框 */}
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    onClick={(e) => onChange(item.id, e.target.checked)}
                                    checked={item.isDone} />
                                <label >{item.name}</label>
                                {/* 删除 */}
                                <button className="destroy" onClick={() => delTask(item.id)}></button>
                            </div>
                        </li>
                    ))
                    }

                </ul>
                总数：{taskStore.allList} &nbsp;
                已完成：{taskStore.finishList}
            </section>
        </section>
    )
}

export default observer(Task)