public class CSVParser {
  public static List<List<String>> parse(String csvData) {
    List<List<String>> rows = new List<List<String>>();
    for (String line : csvData.split('\n')) {
      rows.add(line.split(','));
    }
    return rows;
  }
}