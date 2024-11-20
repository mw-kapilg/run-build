classdef AnnotationPlugin < matlab.unittest.plugins.TestRunnerPlugin
    % Copyright 2024 The MathWorks, Inc.
    
    methods (Access=protected)
        function runTest(plugin, pluginData)
            % Invoke the superclass method
            runTest@matlab.unittest.plugins.TestRunnerPlugin(plugin, pluginData);

            testResult = pluginData.TestResult;
            diagnosticRecord = testResult.Details.DiagnosticRecord;
            if testResult.Failed
                disp("::error file=" + testResult.Name ...
                    + ",line=" + diagnosticRecord.Stack.line ...
                    + ",title=" + diagnosticRecord.Event ...
                    + "::" + diagnosticRecord.Report);
            end
        end
    end
end