package testscript;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
public class Main {
    WebDriver driver;
    @BeforeMethod
    public void init() {
        driver = new ChromeDriver();
    }
    @AfterMethod
    public void cleanup() {
        driver.quit();
    }@Test
public void Test01() {
	driver.get("https://www.saucedemo.com/");
	driver.findElement(By.xpath("//input[@id='user-name']")).sendKeys("standard_user");
	driver.findElement(By.xpath("//input[@id='password']")).sendKeys("secret_sauce");
	driver.findElement(By.xpath("//input[@id='login-button']")).click();
	Assert.assertTrue(driver.getCurrentUrl().equals("https://www.saucedemo.com/inventory.html"));
	driver.findElement(By.xpath("//a[@id='item_4_title_link']")).click();
	Assert.assertTrue(driver.getCurrentUrl().equals("https://www.saucedemo.com/inventory-item.html?id=4"));

}
}