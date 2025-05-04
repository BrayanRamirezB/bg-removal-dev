import { removeBackground } from '@imgly/background-removal'

self.onmessage = async (event) => {
  const { file } = event.data
  try {
    const result = await removeBackground(file)
    self.postMessage({ success: true, result })
  } catch (error) {
    self.postMessage({ success: false, error: error.message })
  }
}
