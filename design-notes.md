# Design Notes - Color & Font Testing

## Typography

### Font Families
- **Body text**: Inter (font-weight: 400)
- **Headings (h1-h5)**: Archivo (font-weight: 700)

### Font Sizes (Type Scale)
- **h1**: 4.210rem (67.36px)
- **h2**: 3.158rem (50.56px)
- **h3**: 2.369rem (37.92px)
- **h4**: 1.777rem (28.48px)
- **h5**: 1.333rem (21.28px)
- **small**: 0.750rem (12px)

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css?family=Archivo:700|Inter:400');
```

---

## CSS Rules

```css
@import url('https://fonts.googleapis.com/css?family=Archivo:700|Inter:400');

body {
  font-family: 'Inter';
  font-weight: 400;
}

h1, h2, h3, h4, h5 {
  font-family: 'Archivo';
  font-weight: 700;
}

html {font-size: 100%;} /* 16px */

h1 {font-size: 4.210rem; /* 67.36px */}

h2 {font-size: 3.158rem; /* 50.56px */}

h3 {font-size: 2.369rem; /* 37.92px */}

h4 {font-size: 1.777rem; /* 28.48px */}

h5 {font-size: 1.333rem; /* 21.28px */}

small {font-size: 0.750rem; /* 12px */}
```

---

## Color Palette

### CSS Variables
```css
--text: #283518;
--background: #fffceb;
--primary: #5d6d37;
--secondary: #dda25f;
--accent: #bb6b25;
```

### Color Descriptions
- **Text**: #283518 (Dark green/olive for text)
- **Background**: #fffceb (Creamy off-white background)
- **Primary**: #5d6d37 (Olive green - main brand color)
- **Secondary**: #dda25f (Warm caramel/peach)
- **Accent**: #bb6b25 (Rustic copper/brown)

