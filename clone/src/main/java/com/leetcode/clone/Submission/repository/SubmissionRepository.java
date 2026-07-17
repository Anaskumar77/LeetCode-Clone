package com.leetcode.clone.Submission.repository;

import com.leetcode.clone.Submission.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, UUID> {

    @Query(value = "SELECT TO_CHAR(DATE(submitted_at), 'YYYY-MM-DD') as date, COUNT(*) as count " +
            "FROM submissions " +
            "WHERE user_id = :userId " +
            "  AND status = 'ACCEPTED' " +
            "  AND EXTRACT(YEAR FROM submitted_at) = :year " +
            "GROUP BY DATE(submitted_at) " +
            "ORDER BY DATE(submitted_at) ASC", nativeQuery = true)
    List<Object[]> findActivityCalendarByUserIdAndYear(@Param("userId") UUID userId, @Param("year") int year);
}
