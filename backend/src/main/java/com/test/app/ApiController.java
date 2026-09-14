package com.test.app;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ApiController {

    private final TestItemRepository repo;

    public ApiController(TestItemRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/status")
    public Map<String, String> status() {
        return Map.of("status", "ok");
    }

    @GetMapping("/items")
    public List<TestItem> getItems() {
        return repo.findAll();
    }

    @PostMapping("/items")
    public TestItem createItem(@RequestBody TestItem item) {
        return repo.save(item);
    }

    @PutMapping("/items/{id}")
    public TestItem updateItem(@PathVariable Long id, @RequestBody TestItem item) {
        item.setId(id);
        return repo.save(item);
    }

    @DeleteMapping("/items/{id}")
    public void deleteItem(@PathVariable Long id) {
        repo.deleteById(id);
    }

    @GetMapping("/protected")
    public Map<String, String> protectedEndpoint(Authentication auth) {
        return Map.of("message", "authenticated", "user", auth.getName());
    }
}
