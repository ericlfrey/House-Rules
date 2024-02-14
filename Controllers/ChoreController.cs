using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseRules.Data;
using HouseRules.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
  private HouseRulesDbContext _dbContext;

  public ChoreController(HouseRulesDbContext context)
  {
    _dbContext = context;
  }

  //   GET /api/chore
  // This endpoint will return all chores
  [HttpGet]
  [Authorize]
  public IActionResult GetChores()
  {
    var chores = _dbContext.Chores
    .Include(c => c.Completions)
    .ToList();
    return Ok(chores);
  }
  // GET /api/chore/{id}
  // This endpoint will return a chore with the current assignees and all completions (you do not need to include each UserProfile that did the completion)
  [HttpGet("{id}")]
  [Authorize]
  public IActionResult GetChore(int id)
  {
    var chore = _dbContext.Chores
      .Include(c => c.Completions)
      .ThenInclude(cc => cc.UserProfile)
      .FirstOrDefault(c => c.Id == id);
    if (chore == null)
    {
      return NotFound();
    }
    return Ok(chore);
  }
  // POST /api/chore/{id}/complete
  // This endpoint will create a new ChoreCompletion.
  [HttpPost("{id}/complete")]
  [Authorize]
  public IActionResult CompleteChore(int id, [FromQuery] int userId)
  {
    var chore = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
    if (chore == null)
    {
      return NotFound();
    }
    // With this modification, you can call the CompleteChore method with a URL like /api/chore/1/complete?userId=abc123, where abc123 is the ID of the user.

    var user = _dbContext.UserProfiles.FirstOrDefault(u => u.Id == userId);
    if (user == null)
    {
      return NotFound();
    }

    var completion = new ChoreCompletion
    {
      ChoreId = id,
      CompletedOn = DateTime.Now,
      UserProfileId = user.Id
    };
    _dbContext.ChoreCompletions.Add(completion);
    _dbContext.SaveChanges();
    return NoContent();
  }
  // The following endpoints should be accessible to admin users only:

  // POST /api/chore
  // Post a new chore to be created
  [HttpPost]
  [Authorize(Roles = "Admin")]
  public IActionResult PostChore(Chore chore)
  {
    _dbContext.Chores.Add(chore);
    _dbContext.SaveChanges();
    // return CreatedAtAction(nameof(GetChore), new { id = chore.Id }, chore);
    return Created($"api/chore/{chore.Id}", chore);
  }
  // PUT /api/chore/{id}
  // This endpoint should allow updating all of the columns of the Chore table (except Id)
  [HttpPut("{id}")]
  [Authorize(Roles = "Admin")]
  public IActionResult PutChore(int id, Chore chore)
  {
    if (id != chore.Id)
    {
      return BadRequest();
    }
    _dbContext.Entry(chore).State = EntityState.Modified;
    try
    {
      _dbContext.SaveChanges();
    }
    catch (DbUpdateConcurrencyException)
    {
      if (!_dbContext.Chores.Any(c => c.Id == id))
      {
        return NotFound();
      }
      else
      {
        throw;
      }
    }
    return NoContent();
  }
  // DELETE /api/chore/{id}
  // This endpoint will delete a chore with the matching id
  [HttpDelete("{id}")]
  [Authorize(Roles = "Admin")]
  public IActionResult DeleteChore(int id)
  {
    var chore = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
    if (chore == null)
    {
      return NotFound();
    }
    _dbContext.Chores.Remove(chore);
    _dbContext.SaveChanges();
    return NoContent();
  }
  // POST /api/chore/{id}/assign
  // This endpoint will assign a chore to a user.
  // Pass the userId in as a query string param, as in the completion endpoint above.
  // This endpoint can return a 204 response.
  [HttpPost("{id}/assign")]
  [Authorize(Roles = "Admin")]
  public IActionResult AssignChore(int id, [FromQuery] int userId)
  {
    var chore = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
    if (chore == null)
    {
      return NotFound("Chore not found.");
    }
    var user = _dbContext.UserProfiles.FirstOrDefault(u => u.Id == userId);
    if (user == null)
    {
      return NotFound("User not found.");
    }
    var choreAssignment = new ChoreAssignment
    {
      ChoreId = id,
      UserProfileId = user.Id
    };
    _dbContext.ChoreAssignments.Add(choreAssignment);
    _dbContext.SaveChanges();
    return NoContent();
  }
  // POST /api/chore/{id}/unassign
  // This endpoint will unassign a chore to a user.
  // Pass the userId in as a query string param, as in the other endpoints above.
  [HttpPost("{id}/unassign")]
  [Authorize(Roles = "Admin")]
  public IActionResult UnassignChore(int id, [FromQuery] int userId)
  {
    var chore = _dbContext.Chores.FirstOrDefault(c => c.Id == id);
    if (chore == null)
    {
      return NotFound();
    }
    var user = _dbContext.UserProfiles.FirstOrDefault(u => u.Id == userId);
    if (user == null)
    {
      return NotFound();
    }
    var choreAssignment = _dbContext.ChoreAssignments.FirstOrDefault(ca => ca.ChoreId == id && ca.UserProfileId == user.Id);
    if (choreAssignment == null)
    {
      return NotFound();
    }
    _dbContext.ChoreAssignments.Remove(choreAssignment);
    _dbContext.SaveChanges();
    return NoContent();
  }
}
