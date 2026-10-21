using NUnit.Framework;

namespace OpenPyStruct.Core.Tests;

/// <summary>
/// Pins the icon policy (see CLAUDE.md, "Icons are code"): the four generated artefacts move together,
/// and the Yak package icon is the 128x128 RGBA PNG the manifest and the release workflow name.
/// File-based on purpose, like <see cref="TestIconCoverage"/>: CI has no Rhino and no Chromium.
/// </summary>
[TestFixture]
public class TestIconPolicy
{
    private static string Root()
    {
        var dir = new DirectoryInfo(AppContext.BaseDirectory);
        while (dir != null && !File.Exists(Path.Combine(dir.FullName, "pyproject.toml"))) dir = dir.Parent;
        Assert.That(dir, Is.Not.Null);
        return dir!.FullName;
    }

    private static string Icons() => Path.Combine(Root(), "grasshopper", "icons");

    private static SortedSet<string> Stems(string dir, string ext) =>
        new(Directory.GetFiles(dir, "*" + ext).Select(f => Path.GetFileNameWithoutExtension(f)));

    [Test]
    public void SvgPngAndManifestCsvListTheSameGlyphs()
    {
        var svg = Stems(Path.Combine(Icons(), "svg"), ".svg");
        var png = Stems(Path.Combine(Icons(), "png24"), ".png");
        var csv = new SortedSet<string>(File.ReadAllLines(Path.Combine(Icons(), "manifest.csv"))
            .Skip(1).Where(l => l.Trim().Length > 0).Select(l => l.Split(',')[0].Trim()));
        Assert.That(png, Is.EquivalentTo(svg), "png24/ and svg/ drifted; re-run `node emit.js`");
        Assert.That(csv, Is.EquivalentTo(svg), "manifest.csv and svg/ drifted; re-run `node emit.js`");
    }

    [Test]
    public void PackageIconIs128SquareRgbaAndWiredIntoManifestAndWorkflow()
    {
        var png = Path.Combine(Icons(), "package", "OpenPyStruct.png");
        Assert.That(File.Exists(png), "icons/package/OpenPyStruct.png missing; run `node emit.js --package`");
        var b = File.ReadAllBytes(png);
        // PNG IHDR: width@16, height@20 (big endian), bit depth@24, colour type@25 (6 = RGBA).
        int W() => (b[16] << 24) | (b[17] << 16) | (b[18] << 8) | b[19];
        int H() => (b[20] << 24) | (b[21] << 16) | (b[22] << 8) | b[23];
        Assert.That((W(), H(), b[25]), Is.EqualTo((128, 128, (byte)6)));

        foreach (var f in new[] { "OpenPyStruct_Logo.svg", "OpenPyStruct_Avatar.png" })
            Assert.That(File.Exists(Path.Combine(Icons(), "package", f)), f + " missing; run `node emit.js --package`");

        var manifest = File.ReadAllText(Path.Combine(Root(), "grasshopper", "manifest.yml"));
        Assert.That(manifest, Does.Contain("icon: OpenPyStruct.png"));
        var workflow = File.ReadAllText(Path.Combine(Root(), ".github", "workflows", "yak-release.yml"));
        Assert.That(workflow, Does.Contain("grasshopper/icons/package/OpenPyStruct.png"));
    }
}
