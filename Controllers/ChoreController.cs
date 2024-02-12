using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseRules.Data;
using HouseRules.Models;

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
  // [Authorize]
  public IActionResult Get()
  {
    return Ok(_dbContext.Chores.ToList());
  }
  // GET /api/chore/{id}
  // This endpoint will return a chore with the current assignees and all completions (you do not need to include each UserProfile that did the completion)
  // POST /api/chore/{id}/complete
  // This endpoint will create a new ChoreCompletion.
  // Use a query string parameter to indicate the userId that will be assigned to the chore matching the id in the URL.
  // Set the CompletedOn property in the controller method so that the client doesn't have to pass it in.
  // This endpoint can return a 204 No Content response once it has created the completion.
  // The following endpoints should be accessible to admin users only:

  // POST /api/chore
  // Post a new chore to be created
  // PUT /api/chore/{id}
  // This endpoint should allow updating all of the columns of the Chore table (except Id)
  // DELETE /api/chore/{id}
  // This endpoint will delete a chore with the matching id
  // POST /api/chore/{id}/assign
  // This endpoint will assign a chore to a user.
  // Pass the userId in as a query string param, as in the completion endpoint above.
  // This endpoint can return a 204 response.
  // POST /api/chore/{id}/unassign
  // This endpoint will unassign a chore to a user.
  // Pass the userId in as a query string param, as in the other endpoints above.
}
