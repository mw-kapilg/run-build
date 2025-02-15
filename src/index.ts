// Copyright 2022-2024 The MathWorks, Inc.

import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as github from '@actions/github';
import * as io from "@actions/io";
//import { matlab } from "run-matlab-command-action";
import * as buildtool from "./buildtool";
import * as buildRunner from "./runMatlabBuild"

/**
 * Gather action inputs and then run action.
 */
async function run() {
    const platform = process.platform;
    const architecture = process.arch;
    const workspaceDir = process.cwd();

//     // Export env variable to inject the buildtool plugin
//     core.exportVariable('MW_MATLAB_BUILDTOOL_DEFAULT_PLUGINS_FCN_OVERRIDE', 'matlab.ciplugins.github.getDefaultPlugins');

    const options: buildtool.RunBuildOptions = {
        Tasks: core.getInput("tasks"),
        BuildOptions: core.getInput("build-options"),
        GithubToken: core.getInput("github-token"),
    };

//     const command = buildtool.generateCommand(options);
//     const startupOptions = core.getInput("startup-options").split(" ");

//     const helperScript = await core.group("Generate script", async () => {
//         const helperScript = await buildRunner.generateScript(workspaceDir, command);
//         core.info("Successfully generated script");
//         return helperScript;
//     });


//     //await core.notice('\u001b[35mRunning MATLAB build');
//     core.info('\u001b[35mRunning MATLAB build');
//     await buildRunner.runCommand(helperScript, platform, architecture, exec.exec, startupOptions);  //{

//    // });

//    // Adding Summary details in log
//    core.info("\u001b[35m####### MATLAB build summary #######");
//    core.info("\u001b[32mTasks run: "+ 3);
//    core.info("\u001b[38;2;255;0;0mTasks failed: "+ 0);
//    core.info("\u001b[33mTasks skipped: "+ 0);

//    //Addding summary Page
//    core.summary
//      .addHeading('MATLAB Build Results')
//      //.addCodeBlock(generateTestResults(), "js")
//      .addTable([
//        [{data: 'Task Name', header: true}, {data: 'Status', header: true}, {data: 'Description', header: true}, {data: 'Duration (HH:MM:SS)', header: true}],
//        ['build', 'Pass ✅', 'Builds the code', '00:00:01'],
//        ['test', 'Fail ❌', 'Run tests', '00:00:05'],
//        ['verify', 'Skipped 🚫', 'Runs static analysis', '00:00:00']
//      ])
//      .addLink('View detailed build result', 'https://github.com')
//      .write()

    // //Test results in summary
    // await core.summary
    // .addHeading('MATLAB Test Results')
    // //.addCodeBlock(generateTestResults(), "js")
    // .addTable([
    //     [{data: 'Test Name', header: true}, {data: 'Diagnostics', header: true}, {data: 'Duration', header: true}],
    //     ['✅ TestFile1', '', '0.01s'],
    //     ['✅ TestFile2', '', '0.02s'],
    //     ['❌ TestFile3', 'Stack trace', '5.00s'],
    //     // [core.summary.addRaw('lorem in table'), '', '']
    // ])
    // .addDetails('lorem', 'ipsum')
    // // .addLink('View detailed test result', 'https://github.com')
    // .write()

    const myTestTitle = 'MATLAB Test Results';
    const myTestHeader = `<table>
    <tr align="center">
        <th>Total tests</th>
        <th>Passed ✅</th>
        <th>Failed ❌</th>
        <th>Incomplete ⚠️</th>
        <th>Not Run 🚫</th>
        <th>Duration(s) ⌛</th>
    </tr>
    <tr align="center">
        <td>6</td>
        <td>5</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>5.03</td>
    </tr>
    </table>`;
    const myTestSubtitle = '<details><summary><h3>All tests</h3></summary>';
    const myTestSummary = `<table>
    <tr>
      <th>Test</th>
      <th>Duration(s)</th>
    </tr>
    <tr>
      <td><b>✅ TestFile1</b>
      <td align="center"><b>0.01</b></td>
    </tr>
    <tr>
      <td>✅ TestFile1/Test1</td>
      <td align="center">0.005</td>
    </tr>
    <tr>
      <td>✅ TestFile1/Test2</td>
      <td align="center">0.005</td>
    </tr>
    <tr>
      <td><b>✅ TestFile2</b>
      <td align="center"><b>0.02</b></td>
    </tr>
    <tr>
      <td>✅ TestFile2/Test1</td>
      <td align="center">0.01</td>
    </tr>
    <tr>
      <td>✅ TestFile2/Test2</td>
      <td align="center">0.01</td>
    </tr>
    <tr>
      <td><b>❌ TestFile3</b>
      <td align="center"><b>5.00</b></td>
    </tr>
    <tr>
      <td>❌ TestFile3/Test1</td>
      <td valign="top" align="center">4.99</td>
    </tr>
    <tr>
      <td>✅ TestFile3/Test2</td>
      <td valign="top" align="center">0.01</td>
    </tr>
    </table>`;
    const myTestSummary2 = `<table>
    <tr>
      <th>Test</th>
      <th>Duration(s)</th>
    </tr>
    <!-- <tr>
      <td><b>✅ TestFile1</b>
      <td align="center"><b>0.01</b></td>
    </tr> -->
    <tr>
      <td><b>✅ TestFile1</b>/Test1</td>
      <td align="center">0.005</td>
    </tr>
    <tr>
      <td><b>✅ TestFile1</b>/Test2</td>
      <td align="center">0.005</td>
    </tr>
    <!-- <tr>
      <td><b>✅ TestFile2</b>
      <td align="center"><b>0.02</b></td>
    </tr> -->
    <tr>
      <td><b>✅ TestFile2</b>/Test1</td>
      <td align="center">0.01</td>
    </tr>
    <tr>
      <td><b>✅ TestFile2</b>/Test2</td>
      <td align="center">0.01</td>
    </tr>
    <!-- <tr>
      <td><b>❌ TestFile3</b>
      <td align="center"><b>5.00</b></td>
    </tr> -->
    <tr>
      <td><b>❌ TestFile3</b>/Test1</td>
      <td valign="top" align="center">4.99</td>
    </tr>
    <tr>
      <td><b>✅ TestFile3</b>/Test2</td>
      <td valign="top" align="center">0.01</td>
    </tr>
    </table>`;
    const myTestSummary3 = `<table>
    <tr>
      <th>Test</th>
      <th>Duration(s)</th>
    </tr>
    <tr>
      <td>
        <details>
          <summary><b>✅ TestFile1</b></summary>
            <ul style="list-style-type: none;">
              <li>✅ Test1</li>
              <li>✅ Test2</li>
            </ul>
        </details>
      <td align="center" valign="top"><b>0.01</b>
      </td>
    </tr>
    <tr>
      <td><b>❌ TestFile3</b>
      <td align="center"><b>5.00</b></td>
    </tr>
    <tr>
      <td>❌ TestFile3/Test1</td>
      <td valign="top" align="center">4.99</td>
    </tr>
    <tr>
      <td>✅ TestFile3/Test2</td>
      <td valign="top" align="center">0.01</td>
    </tr>
    </table>
    </details>`;
    const myScript = `<script>
      function toggleColumns() {
        const columns = document.querySelectorAll('.toggle-column');
        columns.forEach(column => {
            column.classList.toggle('hidden');
        });
      }
    </script>`;
    const myStackTrace = `<details><summary><h3>Failed tests</h3></summary><h4><b>❌ <u>TestFile3/Test1 failed</u></b></h4>
        <details><summary>View stack trace</summary></br>
        <pre>Verification failed in TestExamples/testNonLeapYear.\n    ---------------------\n    Framework Diagnostic:\n    ---------------------\n    verifyEqual failed.\n    --> The numeric values are not equal using \"isequaln\".\n    --> Failure table:\n            Actual    Expected    Error    RelativeError\n            ______    ________    _____    _____________\n              1          2         -1          -0.5    \n    Actual Value:\n         1\n    Expected Value:\n         2\n    ------------------\n    Stack Information:\n    ------------------\n    In C:\\Users\\kapilg\\jenkins visualization\\test-results\\jenkins-matlab-plugin\\work\\workspace\\visualization\\tests\\TestExamples.m (TestExamples.testNonLeapYear) at 36</pre>
        </details></details>
    `;
    const myCoverageSummary = `<table>
    <tr>
        <td valign="top">Function</td>
        <td align="center"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ868djAR5mIlAFnnjF---4paarCg48aQTr-g&s"></td>
    </tr>
    <tr>
        <td valign="middle">Statement</td>
        <td align="center"><img src="https://progress-bar.xyz/88"></td>
    </tr>
    <tr>
        <td valign="bottom">Decision</td>
        <td align="center"><img src="https://progress-bar.xyz/80"></td>
    </tr>
    <tr>
        <td valign="baseline">Condition</td>
        <td align="center"><img src="https://progress-bar.xyz/66"></td>
    </tr>
    <tr>
        <td>MC/DC</td>
        <td valign="top" align="center"><img src="https://progress-bar.xyz/53"></td>
    </tr>
    </table>`;
    const myFooter = `<a href="">Click here</a> to debug using MATLAB Online
    </br>
    (future) <a href="">Click here</a> to manage project on Design Center
    </br>
    (future) <a href="">Click here</a> to view & share results via Quality Center
    </br>`;

    // <!-- <td>
    //   <p>
    //     <details><summary>Stack trace</summary></br>
    //     </br>
    //     </details>
    //   </p>
    //   </td> -->
    
    await core.summary
    .addHeading(myTestTitle)
    .addRaw(myTestHeader, true)
    .addRaw(myTestSubtitle, true)
    .addRaw(myTestSummary3, true)
    // .addHeading('MATLAB Code Coverage')
    .addRaw(myCoverageSummary, true)
    .addRaw(myStackTrace)
    .addRaw(myFooter)
    .addRaw(myScript)
    .write()

    // createCheckWithAnnotations
    // const octokit = new github.GitHub(github.token);
    const octokit = github.getOctokit(options.GithubToken || '');

    const retrieveHeadSHA = () => {
      if (github.context.payload.pull_request) {
        return github.context.payload.pull_request.head.sha;
      }
      return github.context.sha;
    }

    const checkRequest = {
      ...github.context.repo,
      head_sha: retrieveHeadSHA(),
      name: "MATLAB Job Summary",
      // status: "completed",
      // conclusion: "success",
      output: {
        title: myTestTitle,
        summary: myTestHeader
        + '<h3>' + myTestSubtitle + '</h3>'
        + myTestSummary
        + myStackTrace
        + myFooter
        // + myScript
        // ,annotations 
      }
    };
  
    var id = null;
    try {
      const response = await octokit.rest.checks.create(checkRequest);
      // console.log(response.data);
      id = response.data.id;
    } catch (error) {
      throw new Error(`Request to create annotations failed - request: ${ JSON.stringify(checkRequest) }`);
      // - error: ${ error.message } 
    }

    // const get_response = await octokit.rest.checks.get({
    //   ...github.context.repo,
    //   check_run_id: id,
    // });

    // const response_output = get_response.data.output;
    // // console.log(response_output);

    // const update_response = await octokit.rest.checks.update({
    //   ...github.context.repo,
    //   // ...get_response.data.output,
    //   // ...get_response.data,
    //   check_run_id: id,
    //   // output: {summary: "new_summary"},
    //   output: {
    //     title: myTestTitle,
    //     summary: "Hello new summary",
    //     annotations: [],
    //     images: [],
    //   },
    //   actions: [],
    // })

    // console.log(update_response.status);
    // console.log(update_response.data.output.summary);
    

    // Cleanup post run for self hosted runners
    // await io.rmRF(workspaceDir + '/.matlab');

}

run().catch((e) => {
    core.setFailed(e);
});
