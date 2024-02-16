using System.ComponentModel.DataAnnotations;

namespace HouseRules.Models;

public class Chore
{
  public int Id { get; set; }
  [MaxLength(100, ErrorMessage = "Chore names must be 100 characters or less")]
  public string Name { get; set; }
  [Range(1, 5, ErrorMessage = "Chore difficulty must be between 1 and 5")]
  public int Difficulty { get; set; }
  public int ChoreFrequencyDays { get; set; }
  public List<ChoreCompletion> Completions { get; set; }
  public List<ChoreAssignment> Assignments { get; set; }

  public Chore()
  {
    Completions = new List<ChoreCompletion>();
    Assignments = new List<ChoreAssignment>();
  }
}
