import { Layout, Palette, Type } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeCustomizer() {
  const { settings, updateSettings, isDarkMode, toggleDarkMode } = useTheme()

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white border-l shadow-lg p-6 overflow-y-auto">
      <h2 className="text-xl font-bold mb-6">Theme Customization</h2>

      {/* Colors */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <Palette className="h-5 w-5 mr-2" />
          Colors
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Color
            </label>
            <input
              type="color"
              value={settings.colors.primary}
              onChange={(e) =>
                updateSettings({
                  colors: { ...settings.colors, primary: e.target.value },
                })
              }
              className="w-full h-10 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Secondary Color
            </label>
            <input
              type="color"
              value={settings.colors.secondary}
              onChange={(e) =>
                updateSettings({
                  colors: { ...settings.colors, secondary: e.target.value },
                })
              }
              className="w-full h-10 rounded border"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Background Color
            </label>
            <input
              type="color"
              value={settings.colors.background}
              onChange={(e) =>
                updateSettings({
                  colors: { ...settings.colors, background: e.target.value },
                })
              }
              className="w-full h-10 rounded border"
            />
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <Type className="h-5 w-5 mr-2" />
          Typography
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font Family
            </label>
            <select
              value={settings.typography.font_family}
              onChange={(e) =>
                updateSettings({
                  typography: { ...settings.typography, font_family: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="Inter, sans-serif">Inter</option>
              <option value="Roboto, sans-serif">Roboto</option>
              <option value="Open Sans, sans-serif">Open Sans</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Base Font Size
            </label>
            <select
              value={settings.typography.base_font_size}
              onChange={(e) =>
                updateSettings({
                  typography: { ...settings.typography, base_font_size: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="14px">Small</option>
              <option value="16px">Medium</option>
              <option value="18px">Large</option>
            </select>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mb-8">
        <h3 className="flex items-center text-lg font-semibold mb-4">
          <Layout className="h-5 w-5 mr-2" />
          Layout
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Width
            </label>
            <select
              value={settings.layout.max_width}
              onChange={(e) =>
                updateSettings({
                  layout: { ...settings.layout, max_width: e.target.value },
                })
              }
              className="w-full p-2 border rounded"
            >
              <option value="1000px">Narrow</option>
              <option value="1200px">Medium</option>
              <option value="1400px">Wide</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
        >
          <span
            className={`${
              isDarkMode ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </button>
      </div>
    </div>
  )
} 