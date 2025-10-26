import type { Preview } from '@storybook/react-vite'
import type { Decorator } from '@storybook/react'
import { useEffect } from 'react'
import '../src/index.css'

const withDarkMode: Decorator = (Story) => {
  useEffect(() => {
    document.body.classList.add('dark')
    document.body.style.backgroundColor = '#18181b'
    document.body.style.minHeight = '100vh'

    return () => {
      document.body.classList.remove('dark')
      document.body.style.backgroundColor = ''
      document.body.style.minHeight = ''
    }
  }, [])

  return <Story />
}

const preview: Preview = {
  decorators: [withDarkMode],
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#18181b',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;