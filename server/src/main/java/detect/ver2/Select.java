package detect.ver2;

import detect.Calculator;
import detect.HandleElement;
import detect.HandleSelect;
import detect.Pair;
import detect.Process;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Select {
    public static Map<Pair<String, String>, String> detectSelectElement(List<Pair<String, String>> list, Document document) {
        Map<Pair<String, String>, String> res = new HashMap<>();
        Elements selectElements = HandleSelect.getSelectElements(document);
        for (Pair<String, String> pair : list) {
            String question = pair.getFirst();
            String choice = pair.getSecond();
            System.out.println(question + " " + choice);
            Element tmp = null;
            int max_weight = -1;
            double max_full = -1;
            for (Element e : selectElements) {
                if (HandleSelect.hasOption(e, choice)) {
                    if (question.isEmpty()) {
                        System.out.println(100);
                        tmp = e;
                        break;
                    } else {
                        String t = HandleSelect.getTextForSelect(e);
                        Weight w = new Weight(question, e, t);
                        double full = w.getFull();
                        int weight = w.getWeight();
                        if (Calculator.compareWeight(max_weight, max_full, weight, full) > 0) {
                            tmp = e;
                            max_full = full;
                            max_weight = weight;
                        }
                    }
                }
            }
            res.put(pair, Process.getXpath(tmp));
        }
        return res;
    }

    public static void main(String[] args) {
        String linkHtml = "https://form.jotform.com/233591551157458?fbclid=IwAR1ggczzG7OoN6Dgb2SDWtNyznCAAJNW-G8-_3gnejJwPFunwwBuN_NCvh0";
        String htmlContent = Process.getHtmlContent(linkHtml);
        Document document = Process.getDomTree(htmlContent);
        List<Pair<String, String >> list = new ArrayList<>();
        list.add(new Pair<>("", "March"));
        list.add(new Pair<>("Country", "Aruba"));
        list.add(new Pair<>("", "One Way"));
        list.add(new Pair<>("Airline", "Airline 1"));
        Map<Pair<String, String>, String> res = detectSelectElement(list, document);
        for (Map.Entry<Pair<String, String>, String> entry : res.entrySet()) {
            Pair<String, String> pair = entry.getKey();
            String loc = entry.getValue();
            System.out.println(pair.getFirst() + " " + pair.getSecond() + " " + loc);
        }
    }
}
