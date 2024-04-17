package runtest.runtest;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


@RestController
public class runTestHandler {
    public static final String header = "package testscript;\n" +
            "\n" +
            "import org.openqa.selenium.By;\n"+
            "import org.openqa.selenium.WebDriver;\n" +
            "import org.openqa.selenium.chrome.ChromeDriver;\n" +
            "import org.testng.Assert;\n"+
            "import org.testng.annotations.AfterMethod;\n" +
            "import org.testng.annotations.BeforeMethod;\n" +
            "import org.testng.annotations.Test;\n" +
            "import org.openqa.selenium.interactions.Actions;\n" +
            "import org.openqa.selenium.support.ui.Select;\n" +
            "import org.openqa.selenium.WebElement;\n" +
            "import org.openqa.selenium.support.ui.ExpectedConditions;\n" +
            "import org.openqa.selenium.support.ui.Wait;\n" +
            "import org.openqa.selenium.support.ui.WebDriverWait;\n" +
            "import java.time.Duration;"+
            "\n" +
            "public class Main {\n" +
            "    WebDriver driver;\n" +
            "    @BeforeMethod\n" +
            "    public void init() {\n" +
            "        driver = new ChromeDriver();\n" +
            "    }\n" +
            "    @AfterMethod\n" +
            "    public void cleanup() {\n" +
            "        driver.quit();\n" +
            "    }";

    @CrossOrigin(origins = "http://localhost:5173/")
    @PostMapping("/selenium")
    public static ResponseEntity<Resource> runTest(@RequestBody String payload) throws ParseException, IOException, InterruptedException {
        JSONArray testcases = (JSONArray) new JSONParser().parse(payload);
        StringBuilder testScript = new StringBuilder(header);
        for (Object testcase: testcases) {
            JSONObject jsonTestcase = (JSONObject) testcase;
            String testName = (String) jsonTestcase.get("name");
            String script = (String) jsonTestcase.get("script");
            testScript.append("@Test\npublic void ").append(testName).append("() {\n").append(script).append("\n}");

        }
//        JSONObject testcase = (JSONObject) new JSONParser().parse(payload);
//        String test = (String) testcase.get("name");
//        String script = (String) testcase.get("script");
//        testScript.append("@Test\npublic void test").append(test).append("() {\n").append(script).append("\n}");
        testScript.append("\n}");
        File file = new File("script/selenium/src/test/java/testscript/Main.java");
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));
        bufferedWriter.write(testScript.toString());
        bufferedWriter.close();
        String directory = "script/selenium";
        String seleniumDir = Paths.get("").toAbsolutePath().toString() + "/script/selenium";
        FileUtils.deleteDirectory(new File(seleniumDir + "/allure-report"));
        FileUtils.deleteDirectory(new File(seleniumDir + "/allure-results"));

        // Execute Maven command to run tests
        ProcessBuilder processBuilder = new ProcessBuilder("mvn.cmd", "clean", "test");
        processBuilder.directory(new File(Paths.get("")
                .toAbsolutePath() + "/script/selenium/"));
        processBuilder.redirectErrorStream(true);
        processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT); 

        Process process = processBuilder.start();
        // Wait for the process to finish
        int exitCode = process.waitFor();
        System.out.println(exitCode);
//         Read output from process
//        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
//        StringBuilder output = new StringBuilder();
//        String line;
//        while ((line = reader.readLine()) != null) {
//            output.append(line).append("\n");
//        }
//        System.out.println(output);
//        JSONObject responseObject = new JSONObject();
//        File reportpath = new File("script/selenium/target/MyTestsSuite/MyTests.html");
//        String html = Files.readString(Paths.get(Paths.get("").toAbsolutePath()+ "/script/selenium/target/surefire-reports/MyTestSuite/MyTests.html"));
//        responseObject.put("html", html);

        ProcessBuilder reportGen = new ProcessBuilder("allure.bat", "generate", "--single-file");
        reportGen.directory(new File(Paths.get("")
                .toAbsolutePath() + "/script/selenium/"));
        Process reportGenProcess = reportGen.start();
        int reportExitCode = reportGenProcess.waitFor();
        System.out.println(reportExitCode);
        Path reportPath = Paths.get(seleniumDir + "/allure-report").resolve("index.html").normalize();
        Resource resource = new FileUrlResource(reportPath.toUri().toURL());
        String contentType = null;
        try {
            contentType = Files.probeContentType(reportPath);
        } catch (Exception e) {
            e.printStackTrace();
        }

        if (contentType == null) {
            contentType = "application/octet-stream";
        }


        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType)).
                header(HttpHeaders.CONTENT_DISPOSITION, "attachment; fileName:=\""+ resource.getFilename() +  "\"")
                .body(resource);

    }

}
