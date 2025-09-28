/*
  Footer Component for Hospital CMS
  ----------------------------------
  This component renders a consistent footer on every page.
  It includes:
   - Branding & Logo
   - Copyright Info
   - Company, Support, and Legal links
*/

function renderFooter() {
    const footer = document.getElementById("footer");
    if (!footer) return;
  
    footer.innerHTML = `
      <footer class="footer">
        <div class="footer-container">
  
          <!-- Branding Section -->
          <div class="footer-logo">
            <img src="../assets/images/logo/logo.png" alt="Hospital CMS Logo">
            <p>© Copyright ${new Date().getFullYear()}.
               All Rights Reserved by Hospital CMS.</p>
          </div>
  
          <!-- Links Section -->
          <div class="footer-links">
            
            <!-- Company Links -->
            <div class="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
  
            <!-- Support Links -->
            <div class="footer-column">
              <h4>Support</h4>
              <a href="#">Account</a>
              <a href="#">Help Center</a>
              <a href="#">Contact Us</a>
            </div>
  
            <!-- Legal Links -->
            <div class="footer-column">
              <h4>Legals</h4>
              <a href="#">Terms & Conditions</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Licensing</a>
            </div>
  
          </div> <!-- End footer-links -->
  
        </div> <!-- End footer-container -->
      </footer>
    `;
  }
  
  // Auto-render footer on page load
  document.addEventListener("DOMContentLoaded", renderFooter);
  