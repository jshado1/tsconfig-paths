import { assert } from "chai";
import { configLoader } from "../src/config-loader";

describe('config-loader', function () {

  it('should use explicitParams when set', () => {
    const result = configLoader({
      explicitParams: {
        absoluteBaseUrl: "/foo/bar",
        paths: {
          "asd": ["asd"]
        }
      },
      cwd: "/baz"
    });

    assert.equal(result.absoluteBaseUrl, "/foo/bar");
    assert.equal(result.paths["asd"][0], "asd");
  });

  it('should fallback to tsConfigLoader when explicitParams is not set', () => {
    const result = configLoader({
      explicitParams: undefined,
      cwd: "/baz",
      tsConfigLoader: (_: any) => ({
        tsConfigPath: "/baz/tsconfig.json",
        baseUrl: "./src",
        paths: { }
      })
    });

    assert.equal(result.absoluteBaseUrl, "/baz/src");
  });

});
