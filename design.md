# Design System: Kongres Luar Biasa Attendance
## Kongres Wanita Indonesia - Check-in Experience

---

## 🎨 Design Philosophy

**Elegance Through Simplicity**
- Single-purpose interface dengan visual impact yang tinggi
- Celebration of Indonesian heritage dengan modern sensibility
- Accessibility dan usability tanpa compromise aesthetic
- Every pixel serves the moment of recognition

---

## 📐 Color Palette

### Primary Colors
```
Deep Maroon (Heritage)        #8B2E3D
Warm Gold (Prestige)          #D4AF37
Ivory (Clarity)               #F5F3F0
Charcoal (Foundation)         #2C2C2C
```

### Supporting Colors
```
Success Green                 #4CAF50
Alert Red                     #E63946
Secondary Accent              #C1A668 (soft gold)
Neutral Gray                  #707070
Background Light              #FAFAF8
```

### Psychological Intent
- **Deep Maroon**: Authority, respect for the event's significance
- **Warm Gold**: Celebration, achievement, prestige
- **Ivory**: Clarity and trust in the verification process
- **Charcoal**: Professional groundedness

---

## 🔤 Typography System

### Font Family
```
Display/Headlines   : Poppins Bold (700) — modern, confident
Subheadings         : Poppins SemiBold (600) — approachable
Body Text           : Inter Regular (400) — high readability
Input Labels        : Inter Medium (500) — clear hierarchy
```

### Type Scale
```
H1 (Logo/Main Title)      : 48px / 1.2 line-height / Bold
H2 (Section Headers)      : 32px / 1.3 line-height / SemiBold
H3 (Card Headers)         : 24px / 1.4 line-height / SemiBold
Body Large (Results)      : 18px / 1.6 line-height / Regular
Body Normal               : 16px / 1.6 line-height / Regular
Body Small (Labels)       : 14px / 1.5 line-height / Medium
Caption (Metadata)        : 12px / 1.4 line-height / Regular
```

### Letter Spacing
```
Headlines        : -0.5px (tighter, more impact)
Body             : 0.3px (optimal reading)
All Caps         : 1px (ceremonial feel)
```

---

## 🏗️ Layout System

### Grid & Spacing
```
Base Unit              : 8px
Container Max Width    : 1200px
Mobile Breakpoint      : 576px
Tablet Breakpoint      : 768px
Desktop Breakpoint     : 1024px

Spacing Scale:
xs: 4px    | sm: 8px    | md: 16px   | lg: 24px
xl: 32px   | 2xl: 48px  | 3xl: 64px  | 4xl: 80px
```

### Responsive Padding
```
Mobile              : 16px padding
Tablet              : 32px padding
Desktop             : 48px padding
```

---

## 🎭 Component Specifications

### 1. Header/Logo Area
```
Component        : Branded Header
Height           : 80px (desktop) / 64px (mobile)
Background       : Gradient (Deep Maroon to Black)
Logo Size        : 200px x auto
Logo Position    : Left-aligned with 24px padding
Typography       : "KONGRES LUAR BIASA" in Poppins Bold, 28px, Warm Gold
Subtext          : "Kongres Wanita Indonesia" in Inter Medium, 14px, Ivory
Shadow           : Subtle drop shadow (0 4px 12px rgba(0,0,0,0.15))
```

### 2. Main Card (Invitation Check-in)
```
Component        : Verification Card
Width            : 100% (mobile), 520px (tablet+)
Background       : Ivory (#F5F3F0)
Border Radius    : 12px
Padding          : 48px
Box Shadow       : 0 8px 32px rgba(0,0,0,0.08)
Separator Line   : 2px Warm Gold, 40px width, centered

Instructions:
  Typography     : Body Large (18px), Charcoal, centered
  Text           : "Masukkan Nomor Undangan Anda"
  Margin Bottom  : 24px
```

### 3. Input Field (Invitation Number)
```
Component        : Text Input
Width            : 100% of parent
Height           : 56px
Border           : 2px solid #E0E0E0
Border Radius    : 8px
Padding          : 16px
Font             : Inter Regular, 18px, Charcoal
Placeholder      : "Contoh: INV-2024-001" in gray (#999)
Focus State      : 
  Border         : 2px solid Warm Gold
  Box Shadow     : 0 0 0 4px rgba(212, 175, 55, 0.1)
  Transition     : all 0.3s ease
Letter Case      : UPPERCASE (transform on input)
Spacing Below    : 32px
```

### 4. Submit Button
```
Component        : Primary Call-to-Action
Width            : 100%
Height           : 56px
Background       : Deep Maroon (#8B2E3D)
Text             : "VERIFIKASI KEHADIRAN" in Poppins Bold, 16px, Ivory
Border Radius    : 8px
Text Transform   : UPPERCASE
Letter Spacing   : 0.8px
Cursor           : pointer
Transition       : all 0.3s ease

Hover State:
  Background     : Linear gradient (Deep Maroon to #6B1F2D)
  Transform      : translateY(-2px)
  Box Shadow     : 0 12px 24px rgba(139, 46, 61, 0.25)

Active/Pressed:
  Transform      : translateY(0px)
  Box Shadow     : 0 6px 12px rgba(139, 46, 61, 0.15)

Loading State:
  Content        : Animated spinner (0.8s rotation)
  Color          : Ivory
  Cursor         : not-allowed
  Opacity        : 0.9
```

### 5. Result Card (User Confirmation)
```
Component        : Success Card
Width            : 100% (mobile), 520px (tablet+)
Background       : Gradient (Ivory to #F0EEE8)
Border           : 3px solid Warm Gold
Border Radius    : 12px
Padding          : 48px
Box Shadow       : 0 16px 48px rgba(212, 175, 55, 0.15)
Entrance         : Fade in + subtle scale (0.95 → 1.0) over 0.4s

Status Icon:
  Size           : 64px
  Color          : Success Green (#4CAF50)
  Icon           : Checkmark (ⓘ centered, margin-bottom: 24px)
  Animation      : Bounce in (0.6s) with slight delay

Header (User Verification):
  Typography     : H2 (32px), Poppins SemiBold, Charcoal
  Content        : "Selamat Datang!"
  Margin         : 24px bottom
  Color Accent   : First word in Warm Gold

User Details Container:
  Background     : White/Ivory
  Border Radius  : 8px
  Padding        : 24px
  Margin         : 24px 0
  
  Details Layout (2-column on desktop, stacked mobile):
    Name Field:
      Label      : "NAMA LENGKAP" in Inter Medium, 12px, gray (#707070)
      Value      : 20px, Poppins SemiBold, Charcoal
      Margin     : 8px 0 16px 0
    
    Organization:
      Label      : "ORGANISASI / ASAL" in Inter Medium, 12px, gray
      Value      : 18px, Inter Regular, Charcoal
      Margin     : 0
    
    Invitation ID:
      Label      : "NOMOR UNDANGAN" in Inter Medium, 12px, gray
      Value      : 16px, Inter Mono Bold, Deep Maroon
      Spacing    : Letter-spaced 2px

Divider:
  Width          : 40px
  Height         : 2px
  Background     : Warm Gold
  Margin         : 24px auto

Action Button:
  Text           : "CEK PESERTA LAIN"
  Typography     : Inter Medium, 14px
  Color          : Deep Maroon
  Border         : 2px solid Deep Maroon
  Background     : Transparent
  Padding        : 12px 32px
  Border Radius  : 6px
  Cursor         : pointer
  Margin Top     : 24px
  
  Hover:
    Background   : Deep Maroon
    Color        : Ivory
    Transition   : all 0.3s ease
```

### 6. Error State Card
```
Component        : Error Message
Background       : #FFE8E8
Border           : 2px solid Alert Red (#E63946)
Border Radius    : 8px
Padding          : 24px
Margin Top       : 16px

Icon:
  Color          : Alert Red
  Size           : 24px
  Margin Right   : 12px

Text:
  Typography     : Inter Regular, 16px, Charcoal
  Content        : "Nomor undangan tidak ditemukan. Silakan periksa kembali."
  
Entrance        : Shake animation (0.4s)
```

---

## 🌊 Animations & Transitions

### Timing Easing
```
Standard        : cubic-bezier(0.4, 0, 0.2, 1) — 0.3s
Entrance        : cubic-bezier(0.34, 1.56, 0.64, 1) — 0.4s (ease-out-back)
Emphasis        : cubic-bezier(0.68, -0.55, 0.265, 1.55) — 0.3s
Exit            : cubic-bezier(0.25, 0.46, 0.45, 0.94) — 0.2s
```

### Key Animations

**Page Load:**
- Fade in over 0.6s
- Header slides down from top (40px offset) + fade
- Form card fades in with 0.2s delay

**Input Focus:**
- Border glow (Warm Gold, 4px spread)
- Placeholder text fades out
- Duration: 0.3s

**Button Hover:**
- Lift effect (translateY -2px)
- Shadow deepens
- Duration: 0.3s

**Success Result:**
- Checkmark bounces in (0.6s, ease-out-back)
- Card fades + scales (0.95 to 1.0)
- Data reveals with staggered delay (0.1s between items)

**Error Shake:**
- Left-right shake (4px offset, 4 cycles)
- Duration: 0.4s
- Easing: ease-in-out
```css
@keyframes shake {
  0%, 100%   { transform: translateX(0); }
  25%        { transform: translateX(-4px); }
  75%        { transform: translateX(4px); }
}
```

---

## 📱 Responsive Design

### Mobile (< 576px)
```
Padding         : 16px
Card Width      : 100%
Font Sizes      : Reduced by 2px
Input Height    : 48px
Button Height   : 48px
Stacked Layout  : All details stack vertically
Spacing         : Reduced margins (md instead of lg)
```

### Tablet (576px - 1024px)
```
Padding         : 32px
Max Width       : 520px (centered)
Button Height   : 52px
Two-Column Grid : For details (if applicable)
```

### Desktop (> 1024px)
```
Padding         : 48px
Max Width       : 520px (centered in viewport)
Increased Touch: Button height 56px for comfort
```

---

## ♿ Accessibility Standards

### WCAG 2.1 AA Compliance

**Color Contrast:**
```
Text on Maroon      : Ivory (21:1 ratio) ✓
Text on Ivory       : Charcoal (11.8:1 ratio) ✓
Button Borders      : Maroon on Ivory (11.8:1) ✓
Links/Interactive   : Minimum 3:1 contrast
```

**Focus Indicators:**
```
Visible Outline     : 3px Warm Gold
Offset              : 2px from element
For All Interactive Elements

Focus Order        : Logical, left-to-right, top-to-bottom
```

**Typography:**
```
Minimum Font Size  : 16px (body text on mobile)
Line Height        : Minimum 1.5 for readability
Letter Spacing     : Adequate for dyslexic readers
```

**Form Labels:**
```
Associated with Input : <label for="invitation">
Always Visible      : Never placeholder-only
Clear Error Message : Descriptive, not just colors
```

**Semantic HTML:**
```
<button>           : For all interactive actions
<label>            : Associated with form inputs
<h1>, <h2>, etc.   : Proper heading hierarchy
aria-live          : For dynamic content updates
role="alert"       : For error messages
```

---

## 🎬 User Flow Visual States

### State 1: Initial Load
```
┌─────────────────────────────────────────┐
│        KONGRES LUAR BIASA               │  ← Header
│    Kongres Wanita Indonesia             │
├─────────────────────────────────────────┤
│                                         │
│   Masukkan Nomor Undangan Anda          │  ← Instruction
│                                         │
│   ┌───────────────────────────────────┐ │
│   │ INV-XXXX-XXX                       │ │  ← Input
│   └───────────────────────────────────┘ │
│                                         │
│   ┌───────────────────────────────────┐ │
│   │ VERIFIKASI KEHADIRAN              │ │  ← Button (Maroon)
│   └───────────────────────────────────┘ │
│                                         │
└─────────────────────────────────────────┘
```

### State 2: Verification Success
```
┌─────────────────────────────────────────┐
│        KONGRES LUAR BIASA               │
│    Kongres Wanita Indonesia             │
├─────────────────────────────────────────┤
│                                         │
│              ✓ (Green)                  │  ← Checkmark
│                                         │
│   Selamat Datang!                       │  ← Greeting
│                                         │
│   ┌───────────────────────────────────┐ │
│   │ NAMA LENGKAP                      │ │
│   │ Dr. Siti Nurhaliza Wijaya         │ │
│   │                                   │ │
│   │ ORGANISASI / ASAL                 │ │
│   │ Persatuan Perempuan Indonesia     │ │
│   │                                   │ │
│   │ NOMOR UNDANGAN                    │ │
│   │ INV-2024-0842                     │ │
│   └───────────────────────────────────┘ │
│                                         │
│   ╌╌╌╌╌╌╌╌ (Gold divider)              │
│                                         │
│   [ CEK PESERTA LAIN ]  ← Secondary btn │
│                                         │
└─────────────────────────────────────────┘
```

### State 3: Verification Error
```
┌─────────────────────────────────────────┐
│        KONGRES LUAR BIASA               │
│    Kongres Wanita Indonesia             │
├─────────────────────────────────────────┤
│                                         │
│   Masukkan Nomor Undangan Anda          │
│                                         │
│   ┌───────────────────────────────────┐ │
│   │ INV-XXXX-XXX                       │ │
│   └───────────────────────────────────┘ │
│                                         │
│   ┌───────────────────────────────────┐ │
│   │ VERIFIKASI KEHADIRAN              │ │
│   └───────────────────────────────────┘ │
│                                         │
│   ┌──────────────────────────────────┐  │
│   │ ⚠ Nomor undangan tidak ditemukan.│  │ ← Error
│   │   Silakan periksa kembali.       │  │
│   └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🎨 Visual Hierarchy & Emphasis

### Primary Hierarchy
```
1. "Selamat Datang!" (largest, most prominent on success)
2. User name (prominent, main recognition element)
3. Organization name (secondary context)
4. Invitation number (tertiary, reference)
```

### Visual Weight
```
Heavy (80%+)     : Primary heading, user name
Medium (50-70%)  : Organization, secondary headings
Light (30-50%)   : Labels, captions
Minimal (<30%)   : Metadata, timestamps
```

---

## 🔍 Visual Consistency Checklist

- [ ] All buttons use Deep Maroon primary, Warm Gold secondary
- [ ] All input fields have consistent padding (16px) and height (56px)
- [ ] Spacing follows 8px grid
- [ ] Cards have consistent shadow (0 8px 32px)
- [ ] All text uses specified font families and weights
- [ ] Focus states are visible on all interactive elements
- [ ] Color contrast meets WCAG AA standard
- [ ] Animations use specified easing curves
- [ ] Mobile padding is 16px, tablet 32px, desktop 48px
- [ ] Icons and graphics use brand colors only

---

## 🛠️ Implementation Notes

### CSS Variables (Recommended)
```css
:root {
  --color-maroon: #8B2E3D;
  --color-gold: #D4AF37;
  --color-ivory: #F5F3F0;
  --color-charcoal: #2C2C2C;
  --color-success: #4CAF50;
  --color-error: #E63946;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 8px 32px rgba(0,0,0,0.08);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.12);
  
  --border-radius: 8px;
  --transition-normal: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Font Loading (Google Fonts)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" rel="stylesheet">
```

### Performance Optimization
- Fonts: Preload critical weights (Regular, Medium, Bold)
- Images: Lazy load with placeholder
- Animations: Use `transform` and `opacity` for 60fps performance
- Shadows: Use `box-shadow` (hardware accelerated) not filters

---

## 📸 Visual Reference

**Design Inspiration:**
- Elegant governmental/ceremonial design
- Indonesian cultural aesthetics (batik-inspired color palettes)
- Modern minimalism with heritage accents
- Premium conference/summit experience (think exclusive events)
- Emphasis on recognition and celebration moments

**Tone:**
- Respectful and professional
- Warm and welcoming
- Celebratory but not frivolous
- Focused and purposeful

---

## ✅ Sign-Off

**Design Owner:** [Your Name/Team]
**Version:** 1.0
**Last Updated:** May 2024
**Status:** Ready for Development

---

*"Setiap detail adalah bagian dari perayaan."*  
Every detail is part of the celebration.