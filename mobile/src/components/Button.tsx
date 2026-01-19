import React from 'react';import React from 'react';






















































});  },    marginTop: 4,    color: '#8E8E93',    fontSize: 14,  subtitle: {  },    color: '#000000',    fontWeight: '700',    fontSize: 18,  title: {  },    marginBottom: 12,  header: {  },    elevation: 3,    shadowRadius: 4,    shadowOpacity: 0.1,    },      height: 2,      width: 0,    shadowOffset: {    shadowColor: '#000',    marginHorizontal: 16,    marginVertical: 8,    padding: 16,    borderRadius: 12,    backgroundColor: '#FFFFFF',  card: {const styles = StyleSheet.create({};  );    </View>      {children}      )}        </View>          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}          <Text style={styles.title}>{title}</Text>        <View style={styles.header}>      {title && (    <View style={[styles.card, style]}>  return (export const Card: React.FC<CardProps> = ({children, title, subtitle, style}) => {}  style?: ViewStyle;  subtitle?: string;  title?: string;  children: React.ReactNode;interface CardProps {import {View, Text, StyleSheet, ViewStyle} from 'react-native';import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' ? '#000' : '#fff'} />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // Variantes
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#E5E5EA',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  // Tamaños
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    minHeight: 32,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    minHeight: 44,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#000000',
  },
  dangerText: {
    color: '#FFFFFF',
  },
});
