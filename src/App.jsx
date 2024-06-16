import Navbar from "./components/Navbar"
import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid';
import { BiEdit} from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
//uuidv4();  ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  const [showFinished, setShowFinished] = useState(true)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    });
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // useEffect(() => {
  //   let todoString = localStorage.getItem("todos")
  //   if(todoString){
  //     let todos = JSON.parse(localStorage.getItem("todos"))
  //     setTodos(todos)
  //   }
  // }, [])

  
  // const saveTodoLS = () =>{
  //   localStorage.setItem("todos",JSON.stringify(todos))
  // }

  const handleKey = (e) =>{
    if (e.key === 'Enter') {
      handleAdd()
    }
  }

  const handleAdd = () =>{
    if(todo.trim() != ""){ 
      setTodos([...todos, {id: uuidv4(), todo, isComplete: false}])
      setTodo("")
      // saveTodoLS()
    }
    else{
      alert("Field is required!")
    }
  }

  const handleEdit = (e,id,t) =>{
    setTodo(t)

    let newTodos = todos.filter(item=>{
      return item.id!=id
    });

    setTodos(newTodos)
    // saveTodoLS()
  }

  const handleDelete = (e,id) =>{  /*****/ 
    if (window.confirm("Do you really want to Delete?")) {
      let newTodos = todos.filter(item=>{
        return item.id!=id
      });

      setTodos(newTodos)
      // saveTodoLS()
    }
  }

  const handleChange = (e) =>{
    setTodo(e.target.value)
  }

  const toggleFinished = () =>{
    setShowFinished(!showFinished)
  }

  const handleCheckBox = (e) =>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })

    let newTodos = [...todos]; //reference is same so we do this to make a new object then setTodos the new object So it will re render after change
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos)
    // saveTodoLS()
  }

  return (
    <>
      <Navbar />

      <div className="conatiner mx-auto my-7 p-5 rounded-xl bg-white w-1/2  max-md:w-[95%] max-md:mx-2 ">
        <h1 className=" text-3xl font-bold mb-8 text-center ">iTodo: Your All-in-One Todo Manager</h1>
        <h2 className=" text-2xl font-bold mt-8 mb-2">Add Todos</h2>
        
        <div className="addtodo flex flex-col gap-y-2">
          <input onKeyDown={handleKey} onChange={handleChange} value={todo} className=" w-full text-lg p-2 pr-8  rounded-sm border-none outline-gray-400" type="text" placeholder="Enter your new task" />
          <button onClick={handleAdd} className=" bg-[#825ed7] hover:bg-[#764cdb] text-white font-bold text-sm p-2 rounded-md">Save Task</button>
        </div>

        <div className="showF mt-4">
          <input type="checkbox" id="finished" onChange={toggleFinished} checked={showFinished} />
          <label className=" ml-2" htmlFor="finished">Show Finished</label>
          <div className=" h-[1px] w-[95%] mx-auto bg-black opacity-20 mt-2 "></div>
        </div>

        <h2 className=" text-2xl font-bold mt-8 mb-2">Your Todos</h2>

        <div className="todos">
        {todos.length === 0 && <div className=" my-4 text-red-500">No Todos to display</div>}

        {todos.map(item=>{
          return((showFinished || !item.isComplete) &&
            <div key={item.id} className="todo flex my-4 items-center ">
              <input onChange={handleCheckBox} name={item.id} type="checkbox" checked={item.isComplete}/>
              
              <div className={`${item.isComplete ? "line-through" : ""} w-[90%] text bg-violet-100 p-2 ml-3 rounded-sm`}>{item.todo}</div>
              
              <div className="buttons flex gap-x-2 ml-4 h-10 ">
                <button onClick={(e)=>handleEdit(e,item.id,item.todo)} className=" bg-[#825ed7] hover:bg-[#764cdb] text-white font-bold text-sm px-3 rounded-md"><BiEdit /></button>
                <button onClick={(e)=>handleDelete(e,item.id)} className=" bg-[#825ed7] hover:bg-[#764cdb] text-white font-bold text-sm px-3 rounded-md"><AiFillDelete /></button>
              </div>
            </div>
          )
        })}

        </div>
      </div>
    </>
  )
}

export default App