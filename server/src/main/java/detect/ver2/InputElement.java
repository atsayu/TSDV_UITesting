package detect.ver2;

import detect.HandleInput;
import detect.Pair;
import detect.Process;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


import java.util.*;

public class InputElement {
    public static Map<String, String> detectInputElement(List<String> input, Document document) {
        Elements inputElements = HandleInput.getInputElements(document);
        Map<String, String> result = new HashMap<>();
//        List<Weight> list = new ArrayList<>();
        for (String s : input) {
            Weight max = new Weight();
//            int max_weight = -1;
//            double max_full = -1;
//            Element res = null;
//            String tmp = "";
//            for (Element e : inputElements) {
//                Pair<String, Boolean> pair = HandleInput.getTextForInput(e);
//                String text = pair.getFirst();
//                Boolean textIsAttribute = pair.getSecond();
//                Weight w = new Weight(s, e, text, textIsAttribute);
//
//                double full = w.getFull();
//                int weight = w.getWeight();
//                if (full > max_full) {
//                    res = e;
//                    max_full = full;
//                    max_weight = weight;
//                    tmp = text;
//                } else {
//                    if (full == max_full) {
//                        if (weight > max_weight) {
//                            res = e;
//                            max_weight = weight;
//                            tmp = text;
//                        }
//                    }
//                }
//
////                list.add(w);
//            }
//            if (res != null) {
//                result.put(s, Process.getXpath(res));
//                System.out.println(s + " " + Process.getXpath(res) + max_full + " " + max_weight + " " + tmp);
//            }
            for (int i = 0; i < inputElements.size(); i++) {
                Element e = inputElements.get(i);
                Pair<String, Boolean> pair = HandleInput.getTextForInput(e);
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
            if (max.e != null) {
                result.put(s, Process.getXpath(max.e));
                System.out.println(s + " " + Process.getXpath(max.e) + max.getFull() + " " + max.getWeight() + " " + max.text);
            }
        }
//        Map<String, String> res = new HashMap<>();
//        if (list.size() == 1) {
//            Weight w = list.get(0);
//            String source = w.source;
//            Element e = w.e;
//            System.out.println(source + " " + e + " " + w.getFull() + " " + w.getWeight());
//            res.put(w.source, Process.getXpath(e));
//        } else {
//            Collections.sort(list);
//            Map<String, Element> visited = new HashMap<>();
//            List<String> visitedInput = new ArrayList<>();
//            for (int i = list.size() - 1; i >= 0; i--) {
//                String source = list.get(i).source;
//                Element e = list.get(i).e;
//                if (!visited.containsValue(e) && !visited.containsKey(source)) {
//                    visited.put(source, e);
//                    visitedInput.add(source);
//                    res.put(source, Process.getXpath(e));
//                    System.out.println(source + " " + Process.getXpath(e) + " " + list.get(i).text  + " " + list.get(i).getFull() + " " + list.get(i).getWeight());
//                }
//                if (visitedInput.size() == input.size()) {
//                    break;
//                }
//            }
//        }
        return result;
    }

    public static void main(String[] args) {
        String linkHtml = "https://testdetect.wordpress.com/2024/03/17/test-input/";

//        String linkHtml = "https://form.jotform.com/233591551157458";
        String htmlContent = Process.getHtmlContent(linkHtml);
        Document document = Process.getDomTree(htmlContent);
        List<String> input = new ArrayList<>();
//        input.add("First-name_in_passenger");
//        input.add("last_name in passenger");
//        input.add("first_name in contact_person");
//        input.add("last-Name In contact_person");
//        input.add("title in contact person");
//        input.add("Title in passenger name");
//        input.add("e-mail");
//        input.add("area code");
//        input.add("phone");
//        input.add("city in address");
//        input.add("zip");
//        input.add("state or province");
//        input.add("Street address line 2");
//        input.add("Street address");
        //        input.add("Username");
//        input.add("password");
        input.add("password");
//        input.add("confirm password");
//        input.add("new password");
        Map<String, String> res = detectInputElement(input, document);

    }
}
