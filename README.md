# Car registration

**FR**

- It should be possible to register a new car.
- It should be possible to list all of the categories.

**BR**

- It should not be possible to register a car with an existent plate.
- It should not be possible to update a car's plate.
- A new car should be registered with it's availability set to true.
- Only admin users should be able to register a new car.

# Cars indexing

**FR**

- It should be possible to list all available cars.
- It should be possible to list all available cars within a specific category.
- It should be possible to list all available cars that match a specific brand.
- It should be possible to list all available cars with a specific name.

**BR**

- It should not be necessary for the user to be logged in to see the list of available cars.

# Car specification registration

**FR**

- It should be possible to register a specification for a particular car.
- It should be possible to list all specifications.
- It should be possible to list all cars.

**BR**

- It should not be possible to register a specification for a non-existing car.
- It should not be possible to add an existing specification to a new car.
- Only admin users should be able to register a new car.

# Car image upload

**FR**

- It should be possible to register a car's image

**NFR**

- Use multer for file upload

**BR**

- It should be possible to upload more than one image to the same car.
- Only admin users should be able to upload new car images.

# Car rental

**FR**

- It should be possible to rent a car.

**BR**

- The rent should have a minimal duration of 24 hours.
- It should not be possible to rent a car with a user has already rented another.
- It should not be possible to rent a car that has already been taken.

# SOLID

S => SRP - Single Responsibility Principle
O => OCP - Open-Closed Principle
L => LSP - Liskov Substitution Principle
I => ISP - Interface Segregation Principle
D => DIP - Dependency Inversion Principle
