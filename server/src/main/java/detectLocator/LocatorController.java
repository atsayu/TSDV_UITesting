package detectLocator;

import detect.Process;
import detect.object.*;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class LocatorController {
        @CrossOrigin(origins = "http://localhost:5173/")
        @PostMapping("/locator")
        public static ResponseEntity<JSONObject> testScript(@RequestBody String payload) throws ParseException {
            JSONObject response = new JSONObject();
            JSONArray testcases = (JSONArray) new JSONParser().parse(payload);
            for (Object testcase: testcases) {
                JSONObject jsonTestCase = (JSONObject) testcase;
                String url="";
                List<Action> list = new ArrayList<>();
                for (Object action: (JSONArray) jsonTestCase.get("actions")) {
                    JSONObject actionObject = (JSONObject) action;
                    String type = (String) actionObject.get("type");
                    if (type.equals("input")) {
                        String value = (String) actionObject.get("value");
                        String locator = (String) actionObject.get("describedLocator");
                        Action act = new InputAction(value, locator);
                        list.add(act);
                    }
                    if (type.equals("click")) {
                        String locator = (String) actionObject.get("describedLocator");
                        Action act = new ClickAction(locator);
                        list.add(act);
                    }
                    if (type.equals("select")) {
                        String question = (String) actionObject.get("question");
                        String choice = (String) actionObject.get("choice");
                        Action act = new SelectAction(question, choice);
                        list.add(act);
                    }
                    if (type.equals("assertUrl")) {
                        String expectedUrl = (String) actionObject.get("expectedUrl");
                        Action act = new AssertURL(expectedUrl);
                        list.add(act);
                    }
                    if (type.equals("open")) {
                        url = (String) actionObject.get("url");
                    }
                }
                List<Action> detectedLocatorActions = Process.detectLocators(list, url);
                for (Action action: detectedLocatorActions) {
                    if (!response.containsKey(action.getText_locator())) {
                        response.put(action.getText_locator(), action.getDom_locator());
                    }
                }
            }
            return new ResponseEntity<>(response,HttpStatus.OK);
        }
}
