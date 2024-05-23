package detect;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.json.Json;

import java.util.ArrayList;
import java.util.List;

public class HandleElement {

    public static String getAssociatedLabel(String id, Element e) {
        String query = "label[for='" + id + "']";
        Elements label = e.ownerDocument().select(query);
        if (label.isEmpty()) {
            return "";
        } else {
            return label.get(0).text();
        }
    }

    public static void getElementsOfVariousTypes(Document document, Elements inputElements, Elements clickableElements, Elements selectElements) {
        inputElements = HandleInput.getInputElements(document);
        System.out.println(inputElements.size());
        selectElements = HandleSelect.getSelectElements(document);
        clickableElements = HandleClick.getClickableElements(document);
    }

    public static Elements selectInteractableElementsInSubtree(Element e) {
        Elements res = new Elements();
        Elements textarea_tag = e.getElementsByTag("textarea");
        Elements input_tag = e.getElementsByTag("input");
        Elements select_tag = e.getElementsByTag("select");
        Elements a_tag = e.getElementsByTag("a");
        Elements img_tag = e.getElementsByTag("img");
        Elements button = e.getElementsByTag("button");
        if (textarea_tag != null) {
            res.addAll(textarea_tag);
        }
        if (input_tag != null) {
            res.addAll(input_tag);
        }
        if (select_tag != null) {
            res.addAll(select_tag);
        }
        if (a_tag != null) {
            res.addAll(a_tag);
        }
        if (img_tag != null) {
            res.addAll(img_tag);
        }
        if (button != null) {
            res.addAll(button);
        }
        return res;
    }

    public static boolean isLabelHasForAttr(Element e) {
        if (e == null) {
            return false;
        }
        if (e.tagName().equals("label") && e.hasAttr("for") && !e.attr("for").isEmpty()) {
            return true;
        }
        return false;
    }

    public static int getDistance(Element source, Element target) {
        Elements elements = source.getAllElements();
        if (elements.contains(target)) {
            return getDistanceFromLeafNodeToRoot(source, target);
        }
        return 1 + getDistance(source.parent(), target);
    }

    public static int getDistanceFromLeafNodeToRoot (Element source, Element target) {
        if (target == source) {
            return 0;
        }
        return 1 + getDistanceFromLeafNodeToRoot(source, target.parent());
    }

    public static Element findNearestElementWithSpecifiedElement(Element source, List<Element> list) {
        int min_distance = Integer.MAX_VALUE;
        Element res = null;
        for (Element target : list) {
            List<Element> visited = new ArrayList<>();
            int dis = getDistance(source, target, visited);
            System.out.println("distance " + dis);
            if (dis >= 0 && dis < min_distance) {
                min_distance = dis;
                res = target;
            }
        }
        return res;
    }

    public static int isContainTargetElement(Element source, Element target, List<Element> visited) {
        if (source == target) {
            return 0;
        }
        for (Element child : source.children()) {
            if (!visited.contains(child)) {
                int dis = 1 + isContainTargetElement(child, target, visited);
                if (dis > 0) {
                    return dis;
                }
            }
        }
        return Integer.MIN_VALUE;
    }

    public static int getDistance(Element source, Element target, List<Element> visited) {
        int dis = isContainTargetElement(source, target, visited);
        if (dis > 0) {
            return dis;
        }
        visited.add(source);
        return 1 + getDistance(source.parent(), target, visited);
    }

    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://uitesting2024.lovestoblog.com/wp-admin/");
        driver.findElement(By.xpath("/html/body/div/form/p[1]/input")).sendKeys("uitesting2024");
        driver.findElement(By.xpath("/html/body/div/form/div/div/input")).sendKeys("uitesting2024");
        driver.findElement(By.xpath("/html/body/div/form/p[3]/input[1]")).click();
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        String pageSource = driver.getPageSource();
        Document document = Jsoup.parse(pageSource);
        List<Element> visited = new ArrayList<>();
        List<Element> visited2 = new ArrayList<>();
        Element hover= document.selectXpath("/html/body/div[1]/div[1]/div[2]/ul/li[24]/a").first();
        Element hover2 = document.selectXpath("/html/body/div[1]/div[1]/div[2]/ul/li[11]/ul/li[6]/a").first();
        System.out.println(getDistance(document.body(), hover) + " " + getDistance(document.body(), hover, visited));
        System.out.println(getDistance(document.body(), hover2) + " " + getDistance(document.body(), hover2, visited2));

    }


}
