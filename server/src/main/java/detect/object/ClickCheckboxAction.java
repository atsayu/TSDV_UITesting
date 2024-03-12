package detect.object;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class ClickCheckboxAction extends Action{
    private String choice;
    private String dom_locator;
    public ClickCheckboxAction(String choice) {
        this.choice = choice;
        this.dom_locator = "";
    }

    public String getChoice() {
        return choice;
    }

    public String getDom_locator() {
        return dom_locator;
    }

    public void setDom_locator(String dom_locator) {
        this.dom_locator = dom_locator;
    }

    @Override
    public void run(WebDriver driver) {
        driver.findElement(By.xpath(dom_locator)).click();
    }
}
