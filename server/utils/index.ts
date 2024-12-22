export function isPasswordValid(password: string) {
    // Check for minimum length (e.g., 8 characters)
    if (password.length < 8) {
      return false;
    }
  
    // Check for number
    const hasNumber = /\d/.test(password);
  
    // Check for uppercase letter
    const hasUppercase = /[A-Z]/.test(password);
  
    // Check for lowercase letter
    const hasLowercase = /[a-z]/.test(password);
  
    // Check for special character
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
    // Return true if all conditions are met
    return hasNumber && hasUppercase && hasLowercase && hasSpecialChar;
  }