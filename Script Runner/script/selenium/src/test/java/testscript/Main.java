package testscript;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

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
public void Test01() throws InterruptedException {
	driver.get("https://webtest.ranorex.org/wp-login.php");
//    driver.findElement(By.xpath("//*[@id=\"usernameOrEmail\"]")).sendKeys("uitesting2024@gmail.com");
//    driver.findElement(By.cssSelector("#primary > div > main > div.wp-login__container > div > form > div.card.login__form > div.login__form-action > button")).click();
//    Thread.sleep(5000);
////        JavascriptExecutor js = (JavascriptExecutor) driver;
////        String html = (String) js.executeScript(   " return document.documentElement.outerHTML");
////        System.out.println(html);
//        String source = driver.getPageSource();
//        System.out.println(source);
	driver.findElement(By.xpath("//input[@id='user_login']")).sendKeys("ranorex webtest");
	driver.findElement(By.xpath("//input[@id='user_pass']")).sendKeys("ranorex");
	driver.findElement(By.xpath("//input[@id='wp-submit']")).click();
                JavascriptExecutor js = (JavascriptExecutor) driver;
        String html = (String) js.executeScript(   " return document.documentElement.outerHTML");
    String source = driver.getPageSource();
    Thread.sleep(5000);
        System.out.println(html);

}
}