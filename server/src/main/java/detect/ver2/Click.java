package detect.ver2;

import detect.*;
import detect.Process;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.util.*;

public class Click {
    public static Map<String, String> detectClickElement(List<String> input, Document document) {
        Map<String, String> result = new HashMap<>();
//        List<String> inputForClickable = new ArrayList<>();
//        List<String> inputForNonClickable = new ArrayList<>();
//        for (String source : input) {
//            List<String> wordsInSource = HandleString.separateWordsInString(source);
//            HandleString.lowercaseWordsInList(wordsInSource);
//            if (wordsInSource.contains("button") || wordsInSource.contains("btn")) {
//                inputForClickable.add(source);
//            } else {
//                inputForNonClickable.add(source);
//            }
//        }
        List<Element> clickableElements = HandleClick.getClickableElements(document);
        for (String s : input) {
            Weight max = new Weight();
            for (int i = 0; i < clickableElements.size(); i++) {
                Element e = clickableElements.get(i);
                Pair<String, Boolean> pair = HandleClick.getTextForClickableElement(e);
                String text = pair.getFirst();
                Boolean textIsAttribute = pair.getSecond();
                Weight w = new Weight(s, e, text, textIsAttribute);
                if (i == 0) {
                    max = w;
                    continue;
                }
                if (w.compareTo(max) > 0) {
                    max = w;
                }

            }
            if (max.e != null && max.getWeight() > 0 && max.getFull() > 0) {
                result.put(s, Process.getXpath(max.e));
                System.out.println(s + " " + Process.getXpath(max.e) + max.getFull() + " " + max.getWeight() + " " + max.text);
            } else {
                System.out.println("Cant detect element with input is " + s);
            }
        }
        return result;
    }

    public static void main(String[] args) {

        String linkHtml = "http://127.0.0.1:5500/src/main/resources/testcase/example.html";
        String htmlContent = Process.getHtmlContent(linkHtml);
        Document document = Process.getDomTree(htmlContent);
        List<String> input = Arrays.asList("confirm password", "new-password", "password", "Hello");
        List<String> click = Arrays.asList("quick edit", "edit", "submit", "Cong");
        Map<String, String> res_click = detectClickElement(click, document);
        Map<String, String> res_input = InputElement.detectInputElement(input, document);
    }


}
