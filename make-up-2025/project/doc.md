# Recipe Book and Meal Planner Application

## Project Overview

This project is required in order to be able to take the make-up exam (unless otherwise agreed by the lecturer).

Create a web application that allows users to manage recipes and create weekly meal plans. This project will demonstrate understanding of core Angular concepts while building a practical application.

## Core Features

### 1. Recipe Management
- Display a list of recipes with image thumbnails
- Add new recipes with:
  - Title
  - Description
  - Ingredients list
  - Step-by-step instructions
  - Cooking time
  - Difficulty level
  - Image URL
- Edit existing recipes
- Delete recipes
- View detailed recipe information
- Search/filter recipes by name or ingredients

### 2. Meal Planning
- Weekly calendar view
- Drag and drop recipes into calendar slots
- Assign recipes to specific meals (breakfast, lunch, dinner)
- Clear meal slots
- View entire week's meal plan

### 3. Shopping List
- Automatically generate shopping lists from meal plans
- Combine ingredients from multiple recipes
- Mark items as purchased
- Add custom items to the list
- Remove items from the list

### 4. Recipe Categories and Favorites
- Create and manage recipe categories
- Mark recipes as favorites
- Filter recipes by category
- Sort recipes by various criteria (cooking time, difficulty)

## Technical Requirements

### Required Angular Features
- Implementation of routing (**bonus** use lazy loading)
- Use either template-driven and reactive forms (or a combination)
- HTTP client integration with a backend service (JSON Server is recommended)
- Custom pipes for data transformation
- Angular Material components are recommended

### Data Storage
- Use JSON Server as a mock backend
- Implement proper error handling for API calls
- Include loading states for async operations

### UI/UX Requirements
- Consistent styling (Angular Material is recommended)
- Intuitive navigation
- Loading indicators for async operations
- Error messages for failed operations
- Confirmation dialogs (not browser provided) for destructive actions

## Suggested Project Structure (Not Mandatory)
```
src/
├── app/
│   ├── components/
│   │   ├── recipe-list/
│   │   ├── recipe-detail/
│   │   ├── recipe-form/
│   │   ├── meal-planner/
│   │   └── shopping-list/
│   ├── services/
│   │   ├── recipe.service.ts
│   │   ├── meal-plan.service.ts
│   │   └── shopping-list.service.ts
│   ├── models/
│   │   ├── recipe.interface.ts
│   │   └── meal-plan.interface.ts
│   ├── shared/
│   │   ├── pipes/
│   │   └── guards/
│   ├── app.component.ts
│   ├── ... (other core Angular files)
│   └── app.routes.ts
├── assets/
```

## Development Phases (Suggested Timeline)

### Phase 1: Setup and Basic Features
- Project setup with Angular CLI
- Implementation of basic routing
- Creation of core components
- Setup of JSON Server

### Phase 2: Recipe Management
- Recipe list and detail views
- Recipe creation and editing forms
- Implementation of recipe service
- Basic CRUD operations

### Phase 3: Meal Planning
- Calendar view implementation
- Drag and drop functionality
- Meal plan service
- State management for meal plans

### Phase 4: Shopping List and Polishing
- Shopping list generation
- Categories and favorites implementation
- Final styling and polish
- Error handling and testing

## Evaluation Criteria
- Proper implementation of Angular concepts
- Code organization and cleanliness
- Error handling and edge cases
- UI/UX design and responsiveness
- Project structure and modularity

## Bonus Features (Optional)
- Recipe categories and tags
- Recipe ratings and reviews
- Share recipes via email
- Print shopping lists
- Nutrition information
- Multiple meal plan templates

## Resources
- [Angular documentation](https://angular.dev/overview)
- [Angular Material documentation](https://material.angular.io/guides)
- [JSON Server documentation](https://www.npmjs.com/package/json-server)
- [Angular drag and drop CDK documentation](https://material.angular.io/cdk/drag-drop/overview)

## Submission Requirements
- Source code in a Git repository
- README with setup instructions
- Brief documentation of features
- Any necessary environment variables

This project is designed to be challenging but achievable for students with basic Angular knowledge.