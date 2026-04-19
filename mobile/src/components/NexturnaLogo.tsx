import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface NexturnaLogoProps {
  /** Size of the icon square in dp. Default 64. */
  size?: number;
  /** When true the "Nexturna" wordmark is shown to the right of the icon. */
  showWordmark?: boolean;
  /** When true the icon is rendered in monochrome (dark). */
  mono?: boolean;
}

/**
 * Nexturna brand logo component.
 *
 * Renders the speech-bubble queue icon with an optional wordmark.
 * The icon is a pure-View approximation of the brand asset:
 *   - A circular speech bubble (gradient teal→blue or dark-mono)
 *   - Three queue/list rows inside
 *   - A clock badge at the top-right
 *   - An optional "Nexturna" wordmark
 */
const NexturnaLogo: React.FC<NexturnaLogoProps> = ({
  size = 64,
  showWordmark = false,
  mono = false,
}) => {
  const teal = mono ? '#3d4a5c' : '#00c9b4';
  const blue = mono ? '#3d4a5c' : '#2563eb';
  const ringColor = mono ? '#3d4a5c' : '#2563eb';

  const stroke = Math.round(size * 0.09);
  const outerR = size / 2;
  const innerR = outerR - stroke;

  // Clock badge
  const clockR = Math.round(size * 0.22);
  const clockStroke = Math.max(1, Math.round(clockR * 0.28));
  const clockCx = Math.round(size * 0.72);
  const clockCy = Math.round(size * 0.17);

  // Row items inside bubble
  const rowCount = 3;
  const bulletSize = Math.round(size * 0.09);
  const rowGap = Math.round(size * 0.05);
  const listLeft = Math.round(size * 0.22);
  const listRight = Math.round(size * 0.74);
  const listTop = Math.round(size * 0.30);
  const listBottom = Math.round(size * 0.64);
  const rowH = (listBottom - listTop) / rowCount;

  return (
    <View style={[styles.root, showWordmark && styles.rootRow]}>
      {/* Icon container */}
      <View style={{ width: size, height: size }}>
        {/* Outer ring (speech bubble body) */}
        <View
          style={[
            styles.ring,
            {
              width: size,
              height: size,
              borderRadius: outerR,
              borderWidth: stroke,
              borderColor: ringColor,
              backgroundColor: 'transparent',
            },
          ]}
        />

        {/* Speech bubble tail (triangle bottom-left) */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: Math.round(size * 0.08),
            width: 0,
            height: 0,
            borderRightWidth: Math.round(size * 0.18),
            borderTopWidth: Math.round(size * 0.2),
            borderRightColor: 'transparent',
            borderTopColor: ringColor,
          }}
        />
        {/* Tail inner cutout to maintain ring look */}
        <View
          style={{
            position: 'absolute',
            bottom: Math.round(size * 0.03),
            left: Math.round(size * 0.11),
            width: 0,
            height: 0,
            borderRightWidth: Math.round(size * 0.10),
            borderTopWidth: Math.round(size * 0.12),
            borderRightColor: 'transparent',
            borderTopColor: '#ffffff',
          }}
        />

        {/* List rows */}
        {Array.from({ length: rowCount }).map((_, i) => {
          const rowY = listTop + i * rowH + (rowH - bulletSize) / 2;
          const barColor = mono
            ? '#3d4a5c'
            : i === 0
            ? teal
            : i === 1
            ? '#13a8d4'
            : blue;
          const barWidth =
            i === 0
              ? Math.round((listRight - listLeft - bulletSize - rowGap) * 0.65)
              : listRight - listLeft - bulletSize - rowGap;
          return (
            <React.Fragment key={i}>
              {/* Bullet square */}
              <View
                style={{
                  position: 'absolute',
                  top: Math.round(rowY),
                  left: listLeft,
                  width: bulletSize,
                  height: bulletSize,
                  borderRadius: 1,
                  backgroundColor: barColor,
                }}
              />
              {/* Text bar */}
              <View
                style={{
                  position: 'absolute',
                  top: Math.round(rowY),
                  left: listLeft + bulletSize + rowGap,
                  width: barWidth,
                  height: bulletSize,
                  borderRadius: 1,
                  backgroundColor: barColor,
                }}
              />
            </React.Fragment>
          );
        })}

        {/* Clock badge */}
        {/* Outer circle */}
        <View
          style={{
            position: 'absolute',
            top: clockCy - clockR,
            left: clockCx - clockR,
            width: clockR * 2,
            height: clockR * 2,
            borderRadius: clockR,
            backgroundColor: teal,
          }}
        />
        {/* Clock face */}
        <View
          style={{
            position: 'absolute',
            top: clockCy - clockR + clockStroke,
            left: clockCx - clockR + clockStroke,
            width: (clockR - clockStroke) * 2,
            height: (clockR - clockStroke) * 2,
            borderRadius: clockR - clockStroke,
            backgroundColor: '#ffffff',
          }}
        />
        {/* Clock hour hand (up) */}
        <View
          style={{
            position: 'absolute',
            top: clockCy - Math.round((clockR - clockStroke) * 0.6),
            left: clockCx - 1,
            width: 2,
            height: Math.round((clockR - clockStroke) * 0.6),
            backgroundColor: teal,
          }}
        />
        {/* Clock minute hand (right) */}
        <View
          style={{
            position: 'absolute',
            top: clockCy - 1,
            left: clockCx,
            width: Math.round((clockR - clockStroke) * 0.6),
            height: 2,
            backgroundColor: teal,
          }}
        />
      </View>

      {/* Wordmark */}
      {showWordmark && (
        <Text
          style={[
            styles.wordmark,
            {
              fontSize: Math.round(size * 0.45),
              color: mono ? '#1e293b' : '#1e3a8a',
              marginLeft: Math.round(size * 0.18),
            },
          ]}>
          Nexturna
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rootRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ring: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  wordmark: {
    fontWeight: '700',
    letterSpacing: -0.5,
  },
});

export default NexturnaLogo;
