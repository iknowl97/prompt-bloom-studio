import * as React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Layout } from "./components/layout/Layout"

// Pages
import { HomePage } from "./pages/HomePage"
import { PromptBuilder } from "./pages/PromptBuilder"
import { Templates } from "./pages/Templates"
import { Learn } from "./pages/Learn"
import { Profile } from "./pages/Profile"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/prompt-builder" element={<PromptBuilder />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/templates/community" element={<Templates />} />
            <Route path="/templates/personal" element={<Templates />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/learn/basics" element={<Learn />} />
            <Route path="/learn/advanced" element={<Learn />} />
            <Route path="/learn/examples" element={<Learn />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  )
}

export default App
