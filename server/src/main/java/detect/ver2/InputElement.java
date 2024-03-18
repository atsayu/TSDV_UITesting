package detect.ver2;

import detect.HandleInput;
import detect.Pair;
import detect.Process;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;


import java.util.*;

import static detect.ver2.Click.detectClickElement;

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
        /* Chỉnh sửa đầu vào cho các phần tử input ở list input, cho phần tử click ở list click. */
        String linkHtml = "https://form.jotform.com/233591762291461";
        String htmlContent = Process.getHtmlContent(linkHtml);
        Document document = Process.getDomTree(htmlContent);
//        List<String> input = Arrays.asList("First-name_in_passenger", "last_name in passenger", "first_name in contact_person","last-Name In contact_person"
//        ,"title in contact person", "Title in passenger name", "e-mail", "area code", "phone", "city in address", "zip","state or province", "Street address", "Street address line 2"
//        );
//        List<String> click = Arrays.asList("next_btn", "back_btn", "submit_Button");
//
//        Map<String, String> res_click = detectClickElement(click, document);
//        Map<String, String> res_input = detectInputElement(input, document);
        /* Đầu vào cho hàm detect các phần tử select là các cặp câu hỏi (có thể rỗng) và lựa chọn của người dùng (ghi giống trên giao diện web)
        Output cho mỗi cặp đó là xpath của phần tử select.
         */
//        List<Pair<String, String >> select = new ArrayList<>();
//        select.add(new Pair<>("", "March"));
//        select.add(new Pair<>("Country", "Aruba"));
//        select.add(new Pair<>("", "One Way"));
//        select.add(new Pair<>("Airline", "Airline 1"));
//        Map<Pair<String, String>, String> res_select = Select.detectSelectElement(select, document);
//        for (Map.Entry<Pair<String, String>, String> entry : res_select.entrySet()) {
//            Pair<String, String> pair = entry.getKey();
//            String loc = entry.getValue();
//            System.out.println(pair.getFirst() + " " + pair.getSecond() + " " + loc);
//        }
        /* Đầu vào cho hàm detect các phần tử checkbox là các cặp câu hỏi (có thể rỗng) và lựa chọn của người dùng (ghi giống trên giao diện web)
        Với những checkbox chỉ có lựa chọn duy nhất trên web thì người dùng có thể cho câu hỏi rỗng, còn những checkbox mà lựa chọn của chúng giống nhau, người
        dùng nên thêm câu hỏi vào.inte
        Output là xpath của mỗi phần tử checkbox với từng cặp đó.
         */
        Map<String, List<String>> map = new HashMap<>();
//        map.put("hobbies", Arrays.asList("Sports", "Music"));
        map.put("check symptoms",  Arrays.asList("Chest pain", "Other"));
        map.put("", Arrays.asList("Cancer", "Asthma"));
        Map<Pair<String, String>, String> res = Checkbox.detectCheckboxElement(map, document);
        for (Map.Entry<Pair<String, String>, String> entry : res.entrySet()) {
            Pair<String, String> pair = entry.getKey();
            String loc = entry.getValue();
            System.out.println(pair.getFirst() + " " + pair.getSecond() + " " + loc);
        }

    }

}
