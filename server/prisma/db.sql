-- Create Forms table
CREATE TABLE Forms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

-- Create Questions table
CREATE TABLE Questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  formId INT,
  label VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  options TEXT,
  FOREIGN KEY (formId) REFERENCES Forms(id)
);

-- Create Responses table
CREATE TABLE Responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  formId INT,
  answers TEXT NOT NULL,
  FOREIGN KEY (formId) REFERENCES Forms(id)
);