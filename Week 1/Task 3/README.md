# 🎨 Theme Switcher & Persistence

> **Difficulty Level:** Beginner  
> **Estimated Time:** 3-5 hours  
> **Prerequisites:** React fundamentals, CSS variables, local storage

## 🎯 Project Overview

Implement a comprehensive theming system that provides seamless light/dark mode switching with persistent user preferences. The theme system should be globally accessible across all components, respect user preferences, and provide smooth transitions between theme states.

## 🚀 Learning Objectives

Upon completion of this project, you will have mastered:

- **Global State Management**: Implement application-wide theme state management
- **CSS Architecture**: Master CSS custom properties and theme-based styling
- **Data Persistence**: Handle user preferences with localStorage and cookies
- **System Integration**: Respect OS-level theme preferences
- **Performance Optimization**: Efficient theme switching without layout thrashing

## ✨ Core Features

### 🎛️ Essential Functionality

| Feature                | Description                                     | Implementation Priority |
| ---------------------- | ----------------------------------------------- | ----------------------- |
| **Theme Toggle**       | Smooth switching between light and dark themes  | 🔴 Critical             |
| **Local Persistence**  | Save theme preference across browser sessions   | 🔴 Critical             |
| **Global Application** | Apply theme changes to all components instantly | 🔴 Critical             |
| **CSS Variables**      | Centralized color and styling management        | 🔴 Critical             |

### 🎨 Enhanced Features

| Feature                | Description                                              | Implementation Priority |
| ---------------------- | -------------------------------------------------------- | ----------------------- |
| **OS Theme Detection** | Automatically detect and respect system theme preference | 🟡 Nice-to-have         |
| **Smooth Transitions** | Animated transitions between theme states                | 🟡 Nice-to-have         |
| **Custom Themes**      | Support for multiple theme variations beyond light/dark  | 🟢 Future Enhancement   |
| **Theme Preview**      | Live preview of theme changes before applying            | 🟢 Future Enhancement   |

## 🛠️ Technical Requirements

### Theming Solutions

Choose one of the following approaches:

```json
{
  "styled-components": "^5.3.9",
  "@emotion/react": "^11.10.5",
  "css-vars-ponyfill": "^2.4.7"
}
```

### Storage Solutions

- **localStorage**: Primary storage for theme preferences
- **Cookies**: Fallback for SSR compatibility
- **Context API**: Global theme state management

### CSS Architecture

- **CSS Custom Properties**: Centralized theme variables
- **CSS-in-JS**: Component-level theme integration
- **Media Queries**: System theme detection with `prefers-color-scheme`

## 📋 Implementation Checklist

### Phase 1: Foundation

- [ ] Set up theme context and provider
- [ ] Define CSS custom properties for both themes
- [ ] Create theme toggle component
- [ ] Implement basic theme switching

### Phase 2: Core Features

- [ ] Add localStorage persistence
- [ ] Implement system theme detection
- [ ] Create smooth transitions
- [ ] Test across all components

### Phase 3: Enhancement

- [ ] Add theme preview functionality
- [ ] Implement custom theme support
- [ ] Add accessibility improvements
- [ ] Performance optimization

## 🎨 Design System

### Color Palette Structure

```css
:root {
  /* Light Theme */
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-text: #1e293b;
  --color-text-muted: #64748b;
}

[data-theme="dark"] {
  /* Dark Theme */
  --color-primary: #3b82f6;
  --color-secondary: #94a3b8;
  --color-background: #0f172a;
  --color-surface: #1e293b;
  --color-text: #f1f5f9;
  --color-text-muted: #94a3b8;
}
```

### Typography Scale

| Element            | Light Theme | Dark Theme | Notes                         |
| ------------------ | ----------- | ---------- | ----------------------------- |
| **Primary Text**   | `#1e293b`   | `#f1f5f9`  | High contrast for readability |
| **Secondary Text** | `#64748b`   | `#94a3b8`  | Medium contrast for hierarchy |
| **Background**     | `#ffffff`   | `#0f172a`  | Pure white to deep navy       |
| **Surface**        | `#f8fafc`   | `#1e293b`  | Subtle elevation difference   |

## 🔧 Implementation Patterns

### Theme Context Structure

```typescript
interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: (theme: "light" | "dark" | "system") => void;
  resolvedTheme: "light" | "dark";
}
```

### Storage Strategy

1. **Primary**: localStorage for immediate persistence
2. **Fallback**: Cookies for SSR compatibility
3. **Default**: System preference detection
4. **Validation**: Theme validation and fallback handling

## 🎭 Animation Guidelines

### Transition Properties

- **Duration**: 200-300ms for smooth but not sluggish transitions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for natural motion
- **Properties**: Focus on `color`, `background-color`, and `border-color`
- **Performance**: Use `transform` and `opacity` for complex animations

### Accessibility Considerations

- **Reduced Motion**: Respect `prefers-reduced-motion` setting
- **High Contrast**: Ensure sufficient color contrast in both themes
- **Focus Indicators**: Maintain visible focus states across themes
- **Screen Readers**: Announce theme changes to assistive technology

## 🧪 Testing Strategy

### Manual Testing

- [ ] Test theme switching across all components
- [ ] Verify persistence across browser sessions
- [ ] Check system theme detection
- [ ] Validate accessibility compliance

### Automated Testing

- [ ] Unit tests for theme context
- [ ] Integration tests for persistence
- [ ] Visual regression tests
- [ ] Accessibility testing

## 📚 Additional Resources

- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [React Context API](https://reactjs.org/docs/context.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Design System Best Practices](https://www.designsystems.com/)

---

**Ready to create beautiful themes?** 🚀 Start with the basic toggle and build up to the advanced features!
