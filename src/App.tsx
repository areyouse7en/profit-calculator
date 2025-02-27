import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/Tabs'
import { Button } from './components/ui/Button'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <h1>Vite + React + TS + Radix UI</h1>
      
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">首页</TabsTrigger>
          <TabsTrigger value="tab2">关于</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tab1">
          <div className="card">
            <Button onClick={() => setCount((count) => count + 1)}>
              计数: {count}
            </Button>
            <p>
              编辑 <code>src/App.tsx</code> 并保存以测试 HMR
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="tab2">
          <div className="card">
            <p>这是一个使用 Vite, React, TypeScript 和 Radix UI 构建的应用。</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App 