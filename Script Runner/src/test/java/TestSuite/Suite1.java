package TestSuite;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class Suite1 {
    WebDriver driver;
    @BeforeMethod
    public void init() {
        driver = new ChromeDriver();
    }
    @AfterMethod
    public void cleanup() {
        driver.quit();
    }

    @Test
    public void Test1() {
        driver.get("https://www.youtube.com/watch?v=lQCyVy-g1e8&t=277s");
        System.out.println(driver.getTitle());
    }

}
