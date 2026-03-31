/**
 * Shared test utilities for React Native component tests
 */
import ReactTestRenderer from 'react-test-renderer';

/**
 * Recursively extract text strings from a node's children array
 */
function extractStrings(children: ReactTestRenderer.ReactTestInstance['children']): string[] {
  if (!children) {
    return [];
  }
  const parts: string[] = [];
  const items = Array.isArray(children) ? children : [children];
  for (const item of items) {
    if (typeof item === 'string' || typeof item === 'number') {
      parts.push(String(item));
    } else if (item && typeof item === 'object' && 'children' in item) {
      parts.push(...extractStrings(item.children));
    }
  }
  return parts;
}

/**
 * Get all text content from a rendered component tree as a single string
 */
export function getAllText(
  instance: ReactTestRenderer.ReactTestInstance,
): string {
  const {Text} = require('react-native');
  const textNodes = instance.findAllByType(Text);
  return textNodes
    .map(n => extractStrings(n.children).join(''))
    .join(' ');
}

/**
 * Find a TouchableOpacity that contains the given text label
 */
export function findButtonByText(
  root: ReactTestRenderer.ReactTestInstance,
  text: string,
): ReactTestRenderer.ReactTestInstance | undefined {
  const {TouchableOpacity, Text} = require('react-native');
  const buttons = root.findAllByType(TouchableOpacity);
  return buttons.find(b => {
    try {
      const textNodes = b.findAllByType(Text);
      return textNodes.some(n => {
        const content = extractStrings(n.children).join('');
        return content.includes(text);
      });
    } catch {
      return false;
    }
  });
}
