import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight } from 'lucide-react-native';
import { Badge } from '../../components/common/Badge';
import { GradientButton } from '../../components/common/GradientButton';
import { colors, theme } from '../../theme/colors';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    badge: '142 countries mapped',
    title: 'The whole world,\njust for you.',
    subtitle: 'Solo travel is freedom. WANDR gives you the tools to own it.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop', // Lush mountain landscape
  },
  {
    id: '2',
    badge: 'Zero subscription needed',
    title: 'Plan it.\nPack it.\nGo.',
    subtitle: 'Itinerary builder, packing lists, budget tracker — all offline-ready.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop', // Dolomite mountain peak
  },
  {
    id: '3',
    badge: 'Global community',
    title: 'Never truly\nalone.',
    subtitle: '38,000 solo travellers to connect with at every destination.',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1200&auto=format&fit=crop', // Historic romantic street
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const renderSlide = ({ item }: { item: OnboardingSlide }) => {
    return (
      <View style={styles.slideContainer}>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Subtle Dark Gradient Overlay */}
          <LinearGradient
            colors={[
              'rgba(7, 11, 17, 0.4)',
              'rgba(7, 11, 17, 0.65)',
              '#070B11',
            ]}
            locations={[0, 0.5, 0.85]}
            style={styles.gradientOverlay}
          >
            {/* Top Bar with Badge and Skip */}
            <View style={styles.topBar}>
              <Badge label={item.badge} variant="outline" size="sm" />
              <TouchableOpacity onPress={onComplete}>
                <Text style={styles.skipText}>skip</Text>
              </TouchableOpacity>
            </View>

            {/* Bottom Content Area */}
            <View style={styles.bottomContent}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />

      {/* Persistent Bottom Bar with Indicators & CTA */}
      <View style={styles.footerControls}>
        {/* Pagination Indicators */}
        <View style={styles.paginationRow}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Action Button */}
        <GradientButton
          title={currentIndex === slides.length - 1 ? 'Get started' : 'Continue'}
          rightIcon={<ArrowRight size={18} color="#070B11" />}
          onPress={handleNext}
          size="lg"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  slideContainer: {
    width,
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    flex: 1,
    paddingTop: 56,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 150,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomContent: {
    gap: 12,
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: -0.8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
  },
  footerControls: {
    position: 'absolute',
    bottom: 36,
    left: 24,
    right: 24,
    gap: 20,
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    height: 4,
    borderRadius: 2,
  },
  activeDot: {
    width: 28,
    backgroundColor: colors.primary,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
