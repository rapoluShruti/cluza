// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.NEXT_PUBLIC__GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash-exp",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };
// const CodeGenerationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// export const chatSession = model.startChat({
//   generationConfig,
//   history: [],
// });
// export const GenAiCode = model.startChat({
//   generationConfig: CodeGenerationConfig,
//   history: [
//     {
//       role: "user",
//       parts: [
//         {
//           text: 'Generate to do app\nGenerate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, \nwithout any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\nalso you can use date-fns for date format and react-chartjs-2 chart, graph library\n\nReturn the response in JSON format with the following schema:\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\n\nHere’s the reformatted and improved version of your prompt:\n\nGenerate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.\n\nReturn the response in JSON format with the following schema:\n\njson\nCopy code\n{\n  "projectTitle": "",\n  "explanation": "",\n  "files": {\n    "/App.js": {\n      "code": ""\n    },\n    ...\n  },\n  "generatedFiles": []\n}\nEnsure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file\'s code should be included in the code field, following this example:\nfiles:{\n  "/App.js": {\n    "code": "import React from \'react\';\\nimport \'./styles.css\';\\nexport default function App() {\\n  return (\\n    <div className=\'p-4 bg-gray-100 text-center\'>\\n      <h1 className=\'text-2xl font-bold text-blue-500\'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className=\'mt-2 text-gray-700\'>This is a live code editor.</p>\\n    </div>\\n  );\\n}"\n  }\n}\n  Additionally, include an explanation of the project\'s structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.\n  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required\n  \n  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg\n  -Add Emoji icons whenever needed to give good user experinence\n  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\n- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\n- Use icons from lucide-react for logos.\n\n- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.\n   `,\n};\n\n// - The lucide-react library is also available to be imported IF NECCESARY ONLY FOR THE FOLLOWING ICONS: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Clock, Heart, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, ArrowRight. Here\'s an example of importing and using one: import { Heart } from "lucide-react"\\` & \\<Heart className=""  />\\. PLEASE ONLY USE THE ICONS IF AN ICON IS NEEDED IN THE USER\'S REQUEST.\n\n',
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: '```json\n{\n  "projectTitle": "Task Manager App",\n  "explanation": "This project implements a simple task manager application using React, Tailwind CSS for styling, and lucide-react for icons. The app allows users to add, edit, delete, and mark tasks as complete. It\'s organized into several components for better maintainability and scalability. It utilizes local storage to persist task data.",\n  "files": {\n    "/App.js": {\n      "code": "import React from \'react\';\\nimport TaskList from \'./components/TaskList\';\\nimport TaskForm from \'./components/TaskForm\';\\nimport { useState, useEffect } from \'react\';\\n\\n\\nfunction App() {\\n  const [tasks, setTasks] = useState(() => {\\n    const savedTasks = localStorage.getItem(\'tasks\');\\n    return savedTasks ? JSON.parse(savedTasks) : [];\\n  });\\n\\n  useEffect(() => {\\n    localStorage.setItem(\'tasks\', JSON.stringify(tasks));\\n  }, [tasks]);\\n\\n  const addTask = (task) => {\\n    setTasks([...tasks, task]);\\n  };\\n\\n  const editTask = (id, updatedTask) => {\\n    setTasks(tasks.map(task => task.id === id ? { ...task, ...updatedTask } : task));\\n  };\\n\\n  const deleteTask = (id) => {\\n    setTasks(tasks.filter(task => task.id !== id));\\n  };\\n\\n  const toggleComplete = (id) => {\\n    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));\\n  };\\n\\n  return (\\n    <div className=\\"bg-gray-100 min-h-screen flex items-center justify-center\\">\\n      <div className=\\"bg-white p-6 rounded-lg shadow-md w-full max-w-md\\">\\n        <h1 className=\\"text-2xl font-bold text-gray-800 mb-4 text-center\\">Task Manager 📝</h1>\\n        <TaskForm addTask={addTask} />\\n        <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} />\\n      </div>\\n    </div>\\n  );\\n}\\n\\nexport default App;\\n"\n    },\n    "/components/TaskForm.js": {\n      "code": "import React, { useState } from \'react\';\\nimport { Plus } from \'lucide-react\';\\nimport { v4 as uuidv4 } from \'uuid\';\\n\\nconst TaskForm = ({ addTask }) => {\\n  const [taskName, setTaskName] = useState(\'\');\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (taskName.trim() !== \'\') {\\n        addTask({id: uuidv4(),name: taskName.trim(), completed: false});\\n      setTaskName(\'\');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"flex mb-4\\">\\n      <input\\n        type=\\"text\\"\\n        placeholder=\\"Add a task...\\"\\n        value={taskName}\\n        onChange={(e) => setTaskName(e.target.value)}\\n        className=\\"border p-2 mr-2 flex-1 rounded focus:ring focus:ring-blue-200 focus:border-blue-300\\"\\n      />\\n      <button type=\\"submit\\" className=\\"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center space-x-2\\">\\n          <Plus size={18}/>\\n          <span>Add</span>\\n      </button>\\n    </form>\\n  );\\n};\\n\\nexport default TaskForm;\\n"\n    },\n    "/components/TaskList.js": {\n      "code": "import React from \'react\';\\nimport TaskItem from \'./TaskItem\';\\n\\nconst TaskList = ({ tasks, editTask, deleteTask, toggleComplete }) => {\\n  return (\\n    <ul className=\\"space-y-2\\">\\n      {tasks.map(task => (\\n        <TaskItem key={task.id} task={task} editTask={editTask} deleteTask={deleteTask} toggleComplete={toggleComplete} />\\n      ))}\\n    </ul>\\n  );\\n};\\n\\nexport default TaskList;\\n"\n    },\n    "/components/TaskItem.js": {\n      "code": "import React, { useState } from \'react\';\\nimport { Trash, Edit, Check, X } from \'lucide-react\';\\n\\nconst TaskItem = ({ task, editTask, deleteTask, toggleComplete }) => {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [editedName, setEditedName] = useState(task.name);\\n\\n  const handleEdit = () => {\\n    setIsEditing(true);\\n  };\\n\\n  const handleSave = () => {\\n    editTask(task.id, { name: editedName });\\n    setIsEditing(false);\\n  };\\n\\n  const handleCancelEdit = () => {\\n    setIsEditing(false);\\n    setEditedName(task.name)\\n  }\\n\\n  return (\\n    <li className={`flex items-center justify-between p-3 border rounded ${task.completed ? \'bg-green-100 border-green-300\' : \'border-gray-300\'}`}>\\n        \\n      {isEditing ? (\\n          <div className=\'flex-1\'>\\n          <input type=\\"text\\" value={editedName} onChange={(e) => setEditedName(e.target.value)} className=\'border p-1 mr-2 rounded focus:ring focus:ring-blue-200 focus:border-blue-300\'/>\\n          <div className=\\"space-x-2\\">\\n              <button onClick={handleSave} className=\\"text-green-600 hover:text-green-800 focus:outline-none \\"> <Check size={20}/> </button>\\n              <button onClick={handleCancelEdit} className=\\"text-gray-500 hover:text-gray-700 focus:outline-none\\"><X size={20} /></button>\\n          </div>\\n          </div>\\n      ) : (\\n        <div className=\'flex-1 flex items-center space-x-2\' >\\n            <input type=\\"checkbox\\" checked={task.completed} onChange={() => toggleComplete(task.id)} className=\\"mr-2 cursor-pointer\\" />\\n          <span className={`${task.completed ? \'line-through text-gray-500\' : \'text-gray-800\'}`}>{task.name}</span>\\n         </div>\\n      )}\\n      \\n      <div className=\'flex space-x-2\'>\\n        {!isEditing && <button onClick={handleEdit} className=\\"text-blue-500 hover:text-blue-700 focus:outline-none\\"> <Edit size={20} /> </button>}\\n        <button onClick={() => deleteTask(task.id)} className=\\"text-red-500 hover:text-red-700 focus:outline-none\\"> <Trash size={20} /> </button>\\n      </div>\\n    </li>\\n  );\\n};\\n\\nexport default TaskItem;\\n"\n    }\n  },\n    "generatedFiles": [\n    "/App.js",\n    "/components/TaskForm.js",\n    "/components/TaskList.js",\n    "/components/TaskItem.js"\n  ]\n}\n```\n',
//         },
//       ],
//     },
//   ],
// });
// // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// // console.log(result.response.text());
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC__GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const CodeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export const GenAiCode = model.startChat({
  generationConfig: CodeGenerationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate a to-do app in React using Tailwind CSS for styling. Use only lucide-react icons where necessary. Use date-fns for date formatting and react-chartjs-2 for charts. Return a JSON response in the following schema:

{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": { "code": "" },
    ...
  },
  "generatedFiles": []
}

Ensure:
- Files field contains all created files.
- The generatedFiles field lists all filenames.
- Each file's code is in the code field.
- Explanation is concise and clear.
- Use placeholder images from 'https://archive.org/download/placeholder-image/placeholder-image.jpg' where necessary.
- Make designs visually appealing and production-worthy.
- Use icons from lucide-react only when needed.
- Stock photos should be linked from Unsplash.
`,
        },
      ],
    },
  ],
});
