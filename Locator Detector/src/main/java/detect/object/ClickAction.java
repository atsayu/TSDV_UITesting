package detect.object;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class ClickAction extends Action {
    String text_locator;
    String dom_locator;
    public ClickAction(String text_locator) {
        this.text_locator = text_locator;
        this.dom_locator = "";
    }

    public String getText_locator() {
        return text_locator;
    }

    public String getDom_locator() {
        return dom_locator;
    }

    public void setDom_locator(String dom_locator) {
        this.dom_locator = dom_locator;
    }

    @Override
    public void run(WebDriver driver) {
        WebElement element = driver.findElement(By.xpath(dom_locator));
        Wait<WebDriver> wait = new WebDriverWait(driver, Duration.ofSeconds(4));
        wait.until(driver1 -> element.isEnabled() && element.isDisplayed());
        element.click();
    }
}
