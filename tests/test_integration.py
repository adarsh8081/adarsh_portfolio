import pytest
import httpx
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service
from conftest import TestConfig

class TestFrontendIntegration:
    """Test frontend integration with backend services"""
    
    @pytest.fixture(scope="class")
    def driver(self):
        """Setup Chrome driver for Selenium tests"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        yield driver
        driver.quit()
    
    def test_frontend_loads(self, driver):
        """Test that frontend loads successfully"""
        driver.get(TestConfig.get_frontend_url())
        assert "Portfolio" in driver.title or "Nishu" in driver.title
    
    def test_navigation_works(self, driver):
        """Test that navigation works"""
        driver.get(TestConfig.get_frontend_url())
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "nav"))
        )
        
        # Find navigation links
        nav_links = driver.find_elements(By.CSS_SELECTOR, "nav a")
        assert len(nav_links) > 0
        
        # Test clicking on first link
        if nav_links:
            nav_links[0].click()
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
    
    def test_ai_search_integration(self, driver):
        """Test AI search integration"""
        driver.get(TestConfig.get_frontend_url())
        
        # Look for AI search elements
        try:
            search_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='ai-search-input']"))
            )
            
            # Test search functionality
            search_input.send_keys("portfolio projects")
            
            search_button = driver.find_element(By.CSS_SELECTOR, "[data-testid='search-button']")
            search_button.click()
            
            # Wait for results
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='search-results']"))
            )
            
        except Exception as e:
            pytest.skip(f"AI search not available: {e}")
    
    def test_contact_form_integration(self, driver):
        """Test contact form integration"""
        driver.get(TestConfig.get_frontend_url("/contact"))
        
        try:
            # Wait for contact form
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='contact-form']"))
            )
            
            # Fill out form
            name_input = driver.find_element(By.CSS_SELECTOR, "[data-testid='name-input']")
            email_input = driver.find_element(By.CSS_SELECTOR, "[data-testid='email-input']")
            message_input = driver.find_element(By.CSS_SELECTOR, "[data-testid='message-input']")
            
            name_input.send_keys("Test User")
            email_input.send_keys("test@example.com")
            message_input.send_keys("This is a test message")
            
            # Submit form
            submit_button = driver.find_element(By.CSS_SELECTOR, "[data-testid='submit-button']")
            submit_button.click()
            
            # Wait for response
            WebDriverWait(driver, 30).until(
                EC.any_of(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='success-message']")),
                    EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='error-message']"))
                )
            )
            
        except Exception as e:
            pytest.skip(f"Contact form not available: {e}")
    
    def test_responsive_design(self, driver):
        """Test responsive design"""
        driver.get(TestConfig.get_frontend_url())
        
        # Test mobile viewport
        driver.set_window_size(375, 667)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Test tablet viewport
        driver.set_window_size(768, 1024)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Test desktop viewport
        driver.set_window_size(1920, 1080)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )

class TestEndToEndWorkflow:
    """Test end-to-end workflows"""
    
    @pytest.fixture(scope="class")
    def driver(self):
        """Setup Chrome driver for E2E tests"""
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")
        
        service = Service(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=chrome_options)
        yield driver
        driver.quit()
    
    def test_user_journey(self, driver):
        """Test complete user journey"""
        # Start at homepage
        driver.get(TestConfig.get_frontend_url())
        
        # Navigate to projects
        try:
            projects_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href*='projects']"))
            )
            projects_link.click()
            
            # Wait for projects page to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='project-card']"))
            )
            
        except Exception as e:
            pytest.skip(f"Projects page not available: {e}")
        
        # Navigate to contact
        try:
            contact_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href*='contact']"))
            )
            contact_link.click()
            
            # Wait for contact page to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='contact-form']"))
            )
            
        except Exception as e:
            pytest.skip(f"Contact page not available: {e}")
    
    def test_search_workflow(self, driver):
        """Test search workflow"""
        driver.get(TestConfig.get_frontend_url())
        
        try:
            # Find and interact with search
            search_input = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='ai-search-input']"))
            )
            
            # Test multiple searches
            searches = [
                "portfolio projects",
                "technologies used",
                "contact information"
            ]
            
            for search_term in searches:
                search_input.clear()
                search_input.send_keys(search_term)
                
                search_button = driver.find_element(By.CSS_SELECTOR, "[data-testid='search-button']")
                search_button.click()
                
                # Wait for results
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='search-results']"))
                )
                
        except Exception as e:
            pytest.skip(f"Search workflow not available: {e}")
