# Claude Code Configuration

## Changing Model Versions

You can change the Claude model version through:

1. **VS Code Settings**: Open VS Code settings and add to your `settings.json`:
```json
{
  "model": "claude-3-5-sonnet-20241022"
}
```

2. **Environment Variable**: Set `ANTHROPIC_MODEL` in your environment:
```bash
export ANTHROPIC_MODEL="claude-3-5-sonnet-20241022"
```

3. **Configuration Command**: Use the Claude Code CLI:
```bash
claude config set model "claude-3-5-sonnet-20241022"
```

Configuration precedence: Enterprise settings > Project settings > User settings

Replace `"claude-3-5-sonnet-20241022"` with your desired model version (e.g., `"claude-sonnet-4-20250514"` for version 4.1).

## Project Analysis

### Framework & Stack
- **Next.js 14** - React framework with file-based routing
- **React 18** - Client-side components and hooks
- **SASS** - CSS preprocessing with partials structure
- **Font Awesome** - Icon library
- **Dynamic imports** - Code splitting for components

### Project Structure for Converting Node Projects

#### Required Files Structure:
```
pages/projects/[project-name]/
  └── index.js                    # Main project page
Components/projects/[project-name]/
  ├── [MainComponent].js          # Core React component  
  └── code-blocks.js              # Code display component
styles/partials/
  └── _[project-name].scss        # Project-specific styles
public/images/code/
  └── [project-name].jpg          # Project thumbnail
```

#### Conversion Requirements:

1. **Page Structure** (`pages/projects/[name]/index.js`):
   - Import Next.js components (Head, Link, dynamic)
   - Use dynamic import for main component with `ssr: false`
   - Include code description toggle functionality
   - Add "Back to Projects" navigation
   - Implement CodeBlocks component integration

2. **Component Structure** (`Components/projects/[name]/`):
   - Convert Node.js logic to React component
   - Use React hooks (useState, useEffect, useRef)
   - Handle client-side only rendering with mounted state
   - Implement proper cleanup in useEffect

3. **Styling** (`styles/partials/_[name].scss`):
   - Follow existing SASS structure
   - Use project-specific class naming
   - Import in main `globals.scss`

4. **Project Listing** (`pages/projects/index.js`):
   - Add new project card with:
     - Technology badges (HTML, CSS, JS, React)
     - Project title and description
     - Thumbnail image
     - Link to project page

5. **Environment Variables**:
   - Use `NEXT_PUBLIC_` prefix for client-side APIs
   - Configure in `.env.local` (not tracked in git)

#### Key Patterns:
- Dynamic imports prevent SSR issues with browser-dependent code
- `"use client"` directive for client components
- Environment variables accessed via `process.env.NEXT_PUBLIC_*`
- Image optimization with Next.js Image component
- Consistent error handling and loading states

## Currency Converter Issues Found

### Current Problems:
The currency-converter project is a copy of weather-app with wrong content:

1. **Component File** (`Components/projects/currency-converter/CurrencyConverter.js`):
   - Contains OpenWeather API URLs instead of exchange rates API
   - Uses weather-related state variables and logic
   - Returns weather app HTML (temperature, forecast) instead of currency converter UI
   - Loading message says "Loading Currency Converter..." but shows weather container

2. **Page File** (`pages/projects/currency-converter/index.js`):
   - Title and basic structure correct
   - Description incorrectly mentions Google Places API and OpenWeather API
   - Environment variable `NEXT_PUBLIC_EXCHANGE_RATES_API_KEY` declared but not used
   - All detailed description content is about weather functionality

3. **Missing Implementation**:
   - No actual currency conversion logic
   - No currency selection UI
   - No exchange rate fetching from exchangeratesapi.io
   - Missing currency-specific styling

### Required Updates:
1. Rewrite `CurrencyConverter.js` with currency conversion functionality
2. Update page description to explain currency conversion features
3. Implement exchange rates API integration using `NEXT_PUBLIC_EXCHANGE_RATES_API_KEY`
4. Create proper currency converter UI (dropdowns, input fields, results)
5. Add currency-specific styling in `_currency-converter.scss`
6. Update code-blocks component with currency converter examples

## Node.js Currency Converter Analysis

### Original Architecture:
- **Frontend**: Vanilla HTML/CSS/JS with dynamic currency management
- **Backend**: Express server with `/api/rates` endpoint
- **API**: Exchange Rates API (exchangeratesapi.io)
- **Storage**: localStorage for currency preferences
- **Styling**: Dark theme with responsive design

### Key Features:
- 30+ currencies with flag icons
- Real-time exchange rate fetching
- Dynamic currency list add/remove
- Base currency switching capability
- Amount input with live conversion
- Persistent user preferences via localStorage
- Reset and clear functionality

### React Conversion Strategy:

1. **API Route** (`pages/api/rates.js`):
   - Replace Express server endpoint
   - Fetch from Exchange Rates API using `NEXT_PUBLIC_EXCHANGE_RATES_API_KEY`
   - Handle error responses and rate limiting

2. **React Component** (`Components/projects/currency-converter/CurrencyConverter.js`):
   - Convert vanilla JS DOM manipulation to React state
   - Use `useState` for currencies list, base currency, amounts
   - Use `useEffect` for initial data loading and localStorage sync
   - Implement currency selection, conversion calculations, list management

3. **State Management**:
   - Replace localStorage with React state + useEffect persistence
   - Manage selected currencies array
   - Track base currency and exchange rates
   - Handle loading and error states

4. **Styling** (`styles/partials/_currency-converter.scss`):
   - Convert CSS to SASS following project conventions
   - Maintain dark theme and responsive design
   - Integrate with existing color variables and typography

5. **UI Components**:
   - Currency list with flags and input fields
   - Add currency dropdown/selection
   - Control buttons (Reset, Clear, Add)
   - Error handling and loading indicators

## New Project Added: Currency Converter

### Project Overview
The Currency Converter is a React-based financial tool that allows users to convert between 30+ world currencies using real-time exchange rates from the Exchange Rates API (exchangeratesapi.io).

### Development History
- **Source**: Converted from Node.js/Express project (https://github.com/peterajones/nodejs-currency-converter)
- **Architecture Migration**: Vanilla JavaScript DOM manipulation → React hooks and state management
- **API Integration**: Express server endpoint → Next.js client-side API calls
- **Styling**: CSS → SASS with namespaced classes (.cc prefix) to avoid conflicts
- **Storage**: localStorage persistence maintained for user preferences
- **Performance**: Optimized to only call API when user enters amounts (prevents rate limiting)

### Key Features
- **Smart Currency Management**: Add/remove currencies from personalized conversion list
- **Dynamic Base Currency**: Typing in any currency field automatically makes it the base currency
- **Real-time Conversion**: Live calculations as you type with proper number formatting
- **Persistent Preferences**: localStorage remembers your selected currencies between sessions
- **Rate Limiting Handling**: Graceful fallback to demo rates when API limits are exceeded
- **Responsive Design**: Mobile-optimized layout with proper touch targets
- **30+ Currencies**: Major world currencies with country flag icons for easy identification

### Technical Implementation
- **Component**: `Components/projects/currency-converter/CurrencyConverter.js`
- **Styling**: `styles/partials/_currency-converter.scss` with `.cc` namespace
- **Page**: `pages/projects/currency-converter/index.js`
- **API Efficiency**: Only calls Exchange Rates API when user enters amounts (not on page load)
- **Error Handling**: Falls back to demo exchange rates when API is unavailable
- **State Management**: React hooks for currencies, exchange rates, input values, and UI state

### Usage Instructions
1. **Initial Setup**: Default currencies (CAD, USD, EUR, JPY) load automatically on first visit
2. **Adding Currencies**: Click "Add Currency" to see full list of available currencies
3. **Converting Amounts**: Type any amount in any currency field to see live conversions
4. **Base Currency**: The currency you type in becomes the base for all conversions
5. **Managing List**: Use × button to remove currencies, "Reset Amounts" to clear values, "Clear Currencies" to start fresh
6. **Persistence**: Your currency selection is saved and restored on return visits

### Current Status
- ✅ Fully functional with API integration
- ✅ Responsive design with proper alignment
- ✅ Rate limiting protection with demo fallback  
- ✅ localStorage persistence working
- ✅ Smart API caching with localStorage (6-hour cache duration)
- ✅ Enter-key trigger for API calls (prevents unnecessary requests)
- ✅ Code blocks component updated with vanilla currency converter code

## Currency Converter: Vanilla to React Conversion Challenges

### Overview of Conversion Process
Converting the vanilla JavaScript Currency Converter to Next.js/React presented several unique challenges that required systematic problem-solving and architectural decisions.

### Major Challenges Encountered

#### 1. CSS Conflicts and Styling Issues
**Problem**: The original vanilla CSS didn't translate directly to the React component due to:
- Generic `input` selector in `_contactForm.scss` globally overriding currency converter styles
- CSS specificity conflicts between different components
- Layout alignment issues when converting from vanilla DOM structure to React components

**Solution**: 
- Used specific CSS selectors (`input#currency-input`) with proper specificity
- Targeted overrides for problematic contact form styles (min-width, height, display)
- Systematic measurement and adjustment of spacing (68px margins, 12px flag positioning)
- Maintained `.cc` namespace to prevent further conflicts

#### 2. API Rate Limiting and Performance Optimization
**Problem**: Original vanilla version called API immediately on page load, causing:
- Unnecessary API calls from bots, refreshes, and casual browsing
- Risk of hitting monthly API rate limits
- Wasted API quota on non-interactive page visits

**Solution**: 
- Implemented "Enter key trigger" pattern - API only called when user enters amount and presses Enter
- Added localStorage caching system with 6-hour expiration
- Clear red instructional text: "Enter amount and press Enter to get live rates"
- Graceful fallback to demo rates when API fails or rate limited

#### 3. State Management Architecture Migration
**Problem**: Converting vanilla DOM manipulation to React state management:
- Original used direct DOM queries and updates
- Event handlers directly modified DOM elements
- Currency selection and base currency switching logic needed complete rewrite

**Solution**:
- Migrated to React hooks (useState, useEffect) for all state management
- Replaced DOM manipulation with React state updates
- Maintained localStorage for selected currencies persistence
- Implemented proper React event handling patterns

#### 4. Component Structure and Code Organization  
**Problem**: Vanilla project structure didn't map cleanly to Next.js architecture:
- Single HTML file vs. component-based structure
- Inline CSS vs. SASS partials system
- Global JavaScript vs. component-scoped logic

**Solution**:
- Created proper Next.js page structure (`pages/projects/currency-converter/index.js`)
- Separated concerns: main component, styling, and code-blocks display
- Updated code-blocks.js component to show actual vanilla code instead of weather app code
- Maintained project conventions while preserving original functionality

#### 5. Input Field Behavior and UX Issues
**Problem**: Input field behavior differences between vanilla and React:
- Placeholder showing "0.00" when users expected blank fields
- Focus/blur events not working as expected in React
- Currency symbol alignment issues

**Solution**:
- Removed hardcoded "0.00" placeholder attribute
- Implemented proper React focus/blur event handlers  
- Fixed currency symbol and input alignment with precise CSS measurements
- Added proper input value formatting and validation

### Technical Lessons Learned

1. **CSS Debugging**: Always check for global CSS conflicts when converting vanilla projects to component-based architectures
2. **API Optimization**: User-triggered API calls are superior to automatic page-load requests for rate-limited APIs
3. **localStorage Strategy**: Caching API responses dramatically improves UX while reducing API usage
4. **React Patterns**: Proper state management is crucial when converting DOM-manipulation code to React
5. **Progressive Enhancement**: Starting with basic functionality and adding API features creates better user experience

### Final Architecture Benefits

The converted React version provides several advantages over the original vanilla implementation:
- **Better Performance**: Cached API responses, reduced unnecessary API calls
- **Enhanced UX**: Clear user instructions, immediate functionality for returning users  
- **Maintainable Code**: Component-based architecture, separated concerns
- **Responsive Design**: Proper mobile optimization and accessibility
- **Production Ready**: Error handling, fallback systems, and rate limiting protection