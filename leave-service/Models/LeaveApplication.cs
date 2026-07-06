namespace LeaveService.Models;

public class LeaveApplication
{
    public int Id { get; set; }
    public int EmployeeId { get; set; }
    public int LeaveTypeId { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public string? Reason { get; set; }
    public string Status { get; set; } = "Pending";
    public DateTime DateApplied { get; set; } = DateTime.UtcNow;

    public LeaveType? LeaveType { get; set; }
}
