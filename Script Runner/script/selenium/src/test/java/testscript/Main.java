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
	driver.get("http://webtest.ranorex.org/wp-login.php");
	driver.findElement(By.xpath("//input[@id='user_login']")).sendKeys("ranorex webtest");
	driver.findElement(By.xpath("//input[@id='user_pass']")).sendKeys("ranorex");
	driver.findElement(By.xpath("//input[@id='wp-submit']")).click();
	Assert.assertTrue(driver.getCurrentUrl().equals("https://webtest.ranorex.org/wp-admin/"));
	driver.findElement(By.xpath("//a[@id='show-settings-link']")).click();
	driver.findElement(By.xpath("//input[@id='dashboard_activity-hide']")).click();
	driver.findElement(By.xpath("//a[@id='show-settings-link']")).click();
	driver.findElement(By.xpath("//a[@href='edit.php' and @aria-haspopup='true']")).click();
	Assert.assertTrue(driver.getCurrentUrl().equals("https://webtest.ranorex.org/wp-admin/edit.php"));
	new Select(driver.findElement(By.xpath("//select[@name='m']"))).selectByVisibleText("March 2024");
	new Actions(driver)
        .moveToElement(driver.findElement(By.xpath("//a[@href='https://webtest.ranorex.org/wp-admin/post.php?post=99481&action=edit' and @title='Edit “Hello”' and normalize-space()='Hello']")))
        .perform();
	driver.findElement(By.xpath("//a[@href='https://webtest.ranorex.org/wp-admin/post.php?post=99481&action=edit' and @title='Edit this item' and normalize-space()='Edit']")).click();
	Assert.assertTrue(driver.getCurrentUrl().equals("https://webtest.ranorex.org/wp-admin/post.php?post=99481&action=edit"));

}
}