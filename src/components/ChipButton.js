import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { Chip as PaperChip } from 'react-native-paper';
import { theme } from '../core/theme';

const Chip = ({ mode, style, children, ...props }) => (
  <PaperChip
    style={[
      styles.button,
      mode === 'outlined' && { backgroundColor: theme.colors.surface },
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    {...props}>
    {children}
  </PaperChip>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Chip);
